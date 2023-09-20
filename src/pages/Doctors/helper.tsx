import Badge from '@/components/Badge/Badge';
import TableSelectedColumn from '@/components/Table/components/TableSelectedColumn/TableSelectedColumn';
import { columnRowType } from '@/components/Table/Table';
import dayjs from 'dayjs';

export const columns = [
  {
    key: 'firstName',
    name: 'First Name',
  },
  {
    key: 'lastName',
    name: 'Last Name',
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'patients',
    name: 'Patients',
    renderCell: ({ row }: { column: columnRowType; row: columnRowType }) => {
      return (
        <TableSelectedColumn
          value={row?.patients?.length}
          uniqueKey='createdAt'
        />
      );
    },
  },
  {
    key: 'treatments',
    name: 'Treatments',
  },
  {
    key: 'status',
    name: 'Status',
    renderCell: ({ row }: { column: columnRowType; row: columnRowType }) => {
      return <Badge status={row?.status} />;
    },
  },
  {
    key: 'createdAt',
    name: 'Date',
    renderCell: ({ row }: { column: columnRowType; row: columnRowType }) => {
      return (
        <TableSelectedColumn
          value={dayjs(row?.createdAt).format('DD MMMM YYYY')}
          uniqueKey='createdAt'
        />
      );
    },
  },
];
