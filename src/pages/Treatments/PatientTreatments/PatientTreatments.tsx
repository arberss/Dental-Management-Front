import { Actions } from '@/components/Table/actions/TableActions';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import { Box, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddTreatment from './Create/AddTreatment';
import { Treatment } from './Create/index.interface';
import { columns } from './helper';

const Treatments = () => {
  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const params: Readonly<{ patientId?: string }> = useParams();

  const [addTreatmentDrawerOpened, setAddTreatmentDrawerOpened] =
    useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
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
  ];

  const handleTreatmentModalClose = () => {
    setAddTreatmentDrawerOpened(false);
    setSelectedTreatment(null);
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
      />
    </Box>
  );
};

export default Treatments;
