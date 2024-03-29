import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import Input from '@/shared-components/Form/Input/Input';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { Flex } from '@mantine/core';
import { columns } from './treatments.helper';
import { Treatment } from './PatientTreatments/Create/index.interface';
import { IconReportMedical } from '@tabler/icons-react';
import Card from '@/components/Card/Card';
import { IPagination } from '@/components/Pagination/Pagination.interface';
import { Actions } from '@/components/Table/actions/TableActions';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { useDeleteMutation } from '@/hooks/react-query/useMutation';
import { useQueryClient } from 'react-query';
import AddTreatment from './PatientTreatments/Create/AddTreatment';
import AuthContext from '@/context/authContext';
import TreatmentInvoice from '@/components/TreatmentInvoice/TreatmentInvoice';
import { IPatient } from '../Patient/patient.interface';
import useDebounce from '@/hooks/custom/useDebounce';

interface InvoiceData {
  patient: IPatient;
  treatment: Treatment;
}

const Treatments = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [paginations, setPaginations] = useState<IPagination>({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [searchTreatment, setSearchTreatment] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const [deleteTreatmentId, setDeleteTreatmentId] = useState<null | string>(
    null
  );
  const [invoiceModalData, setInvoiceModalData] = useState<InvoiceData | null>(
    null
  );
  const [openInvoiceModal, setOpenInvoiceModal] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchTreatment, 500);

  const { data, isLoading, isSuccess } = usePagination<{
    items: Treatment[];
    pageInfo: IPagination;
  }>(endpoints.treatments, {
    page: paginations.page,
    size: paginations.size,
    search: debouncedSearch,
  });

  const deleteMutation = useDeleteMutation(
    endpoints.deleteTreatment.replace('::treatmentId', deleteTreatmentId ?? '')
  );

  const refetchPatientTreatments = () => {
    queryClient.invalidateQueries(endpoints.treatments);
  };

  const onUpdateInvalidateQueries = () => {
    refetchPatientTreatments();
  };

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
      width: 100,
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
      type: 'view',
      text: 'View',
      sx: (theme) => ({
        backgroundColor: theme.colors.green[4],
        color: theme.colors.dark[8],
      }),
      action: (): void => {
        setSelectedTreatment(
          ({
            ...rowData,
            doctor: rowData?.doctor?._id,
            viewMode: true,
          } as Treatment & { viewMode: boolean }) ?? null
        );
      },
    }),
    ({ rowData }: { rowData?: { [key: string]: any } }): Actions => ({
      type: 'edit',
      text: 'Edit',
      sx: (theme) => ({
        backgroundColor: theme.colors.yellow[4],
        color: theme.colors.dark[8],
      }),
      action: (): void => {
        setSelectedTreatment(
          ({
            ...rowData,
            doctor: rowData?.doctor?._id,
          } as Treatment) ?? null
        );
      },
    }),
    ({ rowData }: { rowData?: { [key: string]: any } }): Actions => ({
      type: 'delete',
      text: 'Delete',
      hidden: !user?.roles?.find((role) => ['admin'].includes(role)),
      sx: (theme) => ({
        backgroundColor: theme.colors.orange[9],
        color: theme.colors.gray[0],
      }),
      action: (): void => {
        setDeleteTreatmentId(rowData?._id);
      },
    }),
    ({ rowData }: { rowData?: { [key: string]: any } }): Actions => ({
      type: 'view',
      text: 'Invoice',
      sx: (theme) => ({
        backgroundColor: theme.colors.blue[9],
        color: theme.colors.gray[0],
      }),
      action: (): void => {
        setInvoiceModalData({
          patient: rowData?.patient!,
          treatment: rowData as Treatment,
        });
        setOpenInvoiceModal(true);
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

  const handleTreatmentModalClose = () => {
    setSelectedTreatment(null);
  };

  const handleSearchTreatment = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTreatment(e.target.value);
  };

  const handleCloseDeleteModal = () => {
    setDeleteTreatmentId(null);
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
          <Flex justify='space-between' align='center' my='xs' gap='md'>
            <Input
              name='treatmentSearch'
              value={searchTreatment}
              onChange={handleSearchTreatment}
              placeholder='Search'
              sx={{
                width: '100%',
              }}
              styles={{
                input: {
                  maxWidth: '250px',
                  width: '100%',
                },
              }}
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
      <AddTreatment
        title='Edit Treatment'
        opened={!!selectedTreatment}
        onClose={handleTreatmentModalClose}
        selectedData={selectedTreatment}
        onUpdateInvalidateQueries={onUpdateInvalidateQueries}
      />
      <ConfirmModal
        isOpen={!!deleteTreatmentId}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTreatment}
        title='Delete treatment'
        description='Are you sure you want to delete the treatment?'
        loading={deleteMutation.isLoading}
      />
      <TreatmentInvoice
        title='Invoice'
        data={invoiceModalData}
        open={openInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
      />
    </>
  );
};

export default Treatments;
