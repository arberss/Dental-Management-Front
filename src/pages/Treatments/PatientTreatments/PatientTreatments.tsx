import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { Actions } from '@/components/Table/actions/TableActions';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import TreatmentInvoice from '@/components/TreatmentInvoice/TreatmentInvoice';
import { endpoints } from '@/config/endpoints';
import AuthContext from '@/context/authContext';
import { useDeleteMutation } from '@/hooks/react-query/useMutation';
import { usePagination } from '@/hooks/react-query/usePagination';
import { useQuery } from '@/hooks/react-query/useQuery';
import { IPatient } from '@/pages/Patient/patient.interface';
import { Box, Flex, Text } from '@mantine/core';
import { useContext, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import AddTreatment from './Create/AddTreatment';
import { Treatment } from './Create/index.interface';
import { columns } from './patientTreatments.helper';

interface InvoiceData {
  patient: IPatient;
  treatment: Treatment;
}

const Treatments = () => {
  const queryClient = useQueryClient();
  const params: Readonly<{ patientId?: string }> = useParams();
  const { user } = useContext(AuthContext);

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
  const [invoiceModalData, setInvoiceModalData] = useState<InvoiceData | null>(
    null
  );
  const [openInvoiceModal, setOpenInvoiceModal] = useState<boolean>(false);

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

  const { data: patient } = useQuery<IPatient>(
    endpoints.patient.replace('::patientId', params?.patientId ?? ''),
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
    queryClient.invalidateQueries(endpoints.patients);
    queryClient.invalidateQueries(endpoints.doctors);
    queryClient.invalidateQueries(endpoints.treatments);
  };

  const onUpdateInvalidateQueries = () => {
    refetchPatientTreatments();
  };

  const tableOptions: TableProps['options'] = {
    tableTitle: '',
    actionColumn: {
      frozen: true,
      position: 'left',
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
          patient: patient!,
          treatment: rowData as Treatment,
        });
        setOpenInvoiceModal(true);
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
          queryClient.invalidateQueries(endpoints.patients);
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
      <TreatmentInvoice
        title='Invoice'
        data={invoiceModalData}
        open={openInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
      />
    </Box>
  );
};

export default Treatments;
