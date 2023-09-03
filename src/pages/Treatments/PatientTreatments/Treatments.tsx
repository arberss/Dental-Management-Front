import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { Box, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import AddTreatment from './Create/AddTreatment';
import { columns } from './helper';

const Treatments = ({ data }) => {
  const [addTreatmentDrawerOpened, setAddTreatmentDrawerOpened] =
    useState(false);

  const tableOptions: TableProps['options'] = {
    tableTitle: '',
    actionColumn: {
      frozen: true,
      position: 'left',
    },
  };

  const handleTreatmentModalClose = () => {
    setAddTreatmentDrawerOpened(false);
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
      <Table columns={columns} rows={data ?? []} options={tableOptions} />
      <AddTreatment
        title='Add Treatment'
        opened={addTreatmentDrawerOpened}
        onClose={handleTreatmentModalClose}
      />
    </Box>
  );
};

export default Treatments;
