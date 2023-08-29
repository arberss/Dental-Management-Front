import TableSelectedColumn from '@/components/Table/components/TableSelectedColumn/TableSelectedColumn';
import { columnRowType } from '@/components/Table/Table';
import { Text } from '@mantine/core';

export const columns = [
  {
    key: 'firstName',
    name: 'First Name',
  },
  {
    key: 'parentName',
    name: 'Parent Name',
  },
  {
    key: 'lastName',
    name: 'Last Name',
  },
  {
    key: 'contactNumber',
    name: 'Contact Number',
  },
  {
    key: 'treatments.length',
    name: 'Treatments',
    renderCell: ({ row }: { column: columnRowType; row: columnRowType }) => {
      return (
        <TableSelectedColumn
          value={row?.treatments?.length}
          uniqueKey='treatments'
        />
      );
    },
  },
];
