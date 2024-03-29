import TableSelectedColumn from '@/components/Table/components/TableSelectedColumn/TableSelectedColumn';
import { columnRowType } from '@/components/Table/Table';
import dayjs from 'dayjs';

export const columns = [
  {
    key: 'name',
    name: 'Name',
  },
  {
    key: 'description',
    name: 'Description',
    cellWrap: true
  },
  {
    key: 'doctor',
    name: 'Doctor',
    renderCell: ({ row }: { column: columnRowType; row: columnRowType }) => {
      return (
        <TableSelectedColumn
          value={`${row?.doctor?.firstName} ${row?.doctor?.lastName}`}
          uniqueKey='doctor'
        />
      );
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
