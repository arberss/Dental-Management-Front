import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { Actions } from '@/components/Table/actions/TableActions';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { useDeleteMutation } from '@/hooks/react-query/useMutation';
import { usePagination } from '@/hooks/react-query/usePagination';
import { Box, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import AddTreatment from './Create/AddTreatment';
import { Treatment } from './Create/index.interface';
import { columns } from './helper';

const Treatments = () => {
  const queryClient = useQueryClient();
  const params: Readonly<{ patientId?: string }> = useParams();

  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });

  const [addTreatmentDrawerOpened, setAddTreatmentDrawerOpened] =
    useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const [deleteTreatmentId, setDeleteTreatmentId] = useState<null | string>(
    null
  );

  const { data: treatments = [] } = usePagination<Treatment[]>(
    endpoints.patientTreatments.replace('::patientId', params?.patientId ?? ''),
    {
      page: paginations.page,
      size: paginations.size,
    },
    {
      skip: !params?.patientId,
    }
  );

  const deleteMutation = useDeleteMutation(
    endpoints.deleteTreatment.replace('::treatmentId', deleteTreatmentId ?? '')
  );

  const refetchPatientTreatments = () => {
    queryClient.invalidateQueries(
      endpoints.patientTreatments.replace(
        '::patientId',
        params?.patientId ?? ''
      )
    );
  };

  const onCreateInvalidateQueries = () => {
    refetchPatientTreatments();
    queryClient.invalidateQueries(endpoints.patientsStats);
  };

  const onUpdateInvalidateQueries = () => {
    refetchPatientTreatments();
  };

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
      sx: (theme) => ({
        backgroundColor: theme.colors.orange[9],
        color: theme.colors.gray[0],
      }),
      action: (): void => {
        setDeleteTreatmentId(rowData?._id);
      },
    }),
  ];

  const handleTreatmentModalClose = () => {
    setAddTreatmentDrawerOpened(false);
    setSelectedTreatment(null);
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
          queryClient.invalidateQueries(
            endpoints.patientTreatments.replace(
              '::patientId',
              params?.patientId ?? ''
            )
          );
        },
      }
    );
  };

  return (
    <Box mt='xl'>
      <Flex justify='space-between' align='center'>
        <Text weight='bold' size='xl'>
          Treatments
        </Text>
        <TableTopActions
          title='Add Treatment'
          onClick={() => setAddTreatmentDrawerOpened(true)}
        />
      </Flex>
      <Table
        columns={columns}
        rows={treatments ?? []}
        options={tableOptions}
        actions={tableActions}
      />
      <AddTreatment
        title={selectedTreatment ? 'Edit Treatment' : 'Add Treatment'}
        opened={
          selectedTreatment
            ? Boolean(selectedTreatment)
            : addTreatmentDrawerOpened
        }
        onClose={handleTreatmentModalClose}
        selectedData={selectedTreatment}
        onCreateInvalidateQueries={onCreateInvalidateQueries}
        onUpdateInvalidateQueries={onUpdateInvalidateQueries}
      />
      <ConfirmModal
        isOpen={Boolean(deleteTreatmentId)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTreatment}
        title='Delete treatment'
        description='Are you sure you want to delete the treatment?'
        loading={deleteMutation.isLoading}
      />
    </Box>
  );
};

export default Treatments;
