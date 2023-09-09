import { ChangeEvent, useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import Input from '@/shared-components/Form/Input/Input';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { Flex } from '@mantine/core';
import { columns } from './helper';
import { Treatment } from './PatientTreatments/Create/index.interface';
import { IconReportMedical } from '@tabler/icons-react';
import Card from '@/components/Card/Card';
import { IPagination } from '@/components/Pagination/Pagination.interface';
import { Actions } from '@/components/Table/actions/TableActions';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { useDeleteMutation } from '@/hooks/react-query/useMutation';
import { useQueryClient } from 'react-query';

const Treatments = () => {
  const queryClient = useQueryClient();

  const [paginations, setPaginations] = useState<IPagination>({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [searchTreatment, setSearchTreatment] = useState('');
  const [deleteTreatmentId, setDeleteTreatmentId] = useState<null | string>(
    null
  );
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const { data, isLoading, isSuccess } = usePagination<{
    items: Treatment[];
    pageInfo: IPagination;
  }>(endpoints.treatments, {
    page: paginations.page,
    size: paginations.size,
    search: searchTreatment,
  });

  const deleteMutation = useDeleteMutation(
    endpoints.deleteTreatment.replace('::treatmentId', deleteTreatmentId ?? '')
  );

  useEffect(() => {
    if (isSuccess) {
      setPaginations({
        ...paginations,
        totalPages: data.pageInfo.totalPages,
      });
    }
  }, [isSuccess]);

  const tableOptions: TableProps['options'] = {
    tableTitle: '',
    actionColumn: {
      frozen: true,
      position: 'left',
      width: 150,
    },
    pagination: {
      activePage: paginations.page,
      size: paginations.size,
      totalPages: paginations.totalPages,
      onChange: (selectedNumber: number) => {
        setPaginations({ ...paginations, page: selectedNumber });
      },
      onSizeChange: (selectedNumber: string) => {
        setPaginations({ ...paginations, page: 1, size: +selectedNumber });
      },
    },
  };

  const tableActions = [
    ({ rowData }: { rowData?: { [key: string]: any } }): Actions => ({
      type: 'delete',
      text: 'Delete',
      sx: (theme) => ({
        backgroundColor: theme.colors.orange[9],
        color: theme.colors.gray[0],
      }),
      action: (): void => {
        setDeleteTreatmentId(rowData?._id);
        setConfirmDeleteModal(true);
      },
    }),
  ];

  const cards = [
    {
      icon: <IconReportMedical size='35px' color='green' />,
      title: 'Treatments',
      value: data?.pageInfo?.totalPages ?? 0,
    },
  ];

  const handleSearchTreatment = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTreatment(e.target.value);
  };

  const handleCloseDeleteModal = () => {
    setDeleteTreatmentId(null);
    setConfirmDeleteModal(false);
  };

  const handleConfirmDeleteTreatment = () => {
    deleteMutation.mutate(
      {},
      {
        onSuccess: () => {
          handleCloseDeleteModal();
          queryClient.invalidateQueries(endpoints.treatments);
        },
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <RightContent>
        <>
          <Flex gap='lg' align='center' wrap='wrap' pb='lg'>
            {cards.map((card) => {
              return (
                <Card
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                />
              );
            })}
          </Flex>
          <Flex justify='space-between' align='center' my='xs'>
            <Input
              name='treatmentSearch'
              value={searchTreatment}
              onChange={handleSearchTreatment}
              placeholder='Search'
            />
          </Flex>
          <Table
            columns={columns}
            rows={data?.items ?? []}
            options={tableOptions}
            actions={tableActions}
          />
        </>
      </RightContent>
      <ConfirmModal
        isOpen={confirmDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTreatment}
        title='Delete treatment'
        description='Are you sure you want to delete the treatment?'
      />
    </>
  );
};

export default Treatments;
