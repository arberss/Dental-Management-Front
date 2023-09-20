import Outside from '@/shared-components/OutsideWrapper/Outside';
import { Text, useMantineColorScheme } from '@mantine/core';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import Pagination from '../Pagination/Pagination';
import ColumnActions, { Actions } from './actions/TableActions';
import TableHeader from './components/TableHeader/TableHeader';
import './table.scss';

export type columnRowType = { [key: string]: any };

export interface TableProps {
  columns: { key: string; name: string }[];
  rows: { [key: string]: any }[];
  onRowClick?: (column: columnRowType, row: columnRowType) => void;
  onRowDoubleClick?: (column: columnRowType, row: columnRowType) => void;
  exports?: { pdf?: boolean; excel?: boolean; csv?: boolean };
  actions?: (({ rowData }: { rowData?: { [key: string]: any } }) => Actions)[];
  options?: {
    tableTitle?: string;
    actionColumn?: {
      frozen?: boolean;
      width?: number;
      position?: 'left' | 'right';
    };
    pagination?: {
      activePage: number;
      size: number;
      totalPages: number;
      onChange: (value: number) => void;
      onSizeChange: (value: string) => void;
    };
  };
  bottomRows?: { key: string; [key: string]: string | number }[] | null;
  style?: React.CSSProperties;
  onOutsideClick?: () => void;
}

const Table = ({
  columns,
  rows,
  onRowClick,
  onRowDoubleClick,
  exports,
  actions,
  options,
  bottomRows,
  style,
  onOutsideClick,
}: TableProps) => {
  const { colorScheme } = useMantineColorScheme();

  let customColumns = [...columns];

  if (actions) {
    const tableActions = [
      {
        key: 'actions',
        name: 'Actions',
        frozen: options?.actionColumn?.frozen,
        width: options?.actionColumn?.width,
        headerRenderer: ({ column }: { column: columnRowType }) => column?.name,
        renderCell: ({ row }: { row: any }): JSX.Element => (
          <div className='tableGrid__actions'>
            <ColumnActions rowData={row} actions={actions} />
          </div>
        ),
      },
    ];

    if (options?.actionColumn?.position === 'right') {
      customColumns.push(...tableActions);
    } else {
      customColumns = [...tableActions, ...customColumns];
    }
  }

  const gridElement = (
    <DataGrid
      style={style}
      className={`${
        colorScheme === 'dark' ? 'rdg-dark' : 'rdg-light'
      } tableGrid`}
      columns={customColumns}
      rows={rows}
      onCellDoubleClick={onRowDoubleClick}
      onCellClick={onRowClick}
      renderers={{
        noRowsFallback: (
          <Text
            sx={{ padding: '10px', textAlign: 'center', gridColumn: '1/-1' }}
            size='md'
          >
            There is no data
          </Text>
        ),
      }}
      bottomSummaryRows={bottomRows}
      rowHeight={45}
    />
  );

  return (
    <>
      <TableHeader
        table={gridElement}
        options={{ exports, title: options?.tableTitle }}
      />
      <Outside onOutsideClick={onOutsideClick}>{gridElement}</Outside>
      <Pagination
        activePage={options?.pagination?.activePage}
        size={options?.pagination?.size}
        totalPages={options?.pagination?.totalPages}
        onChange={options?.pagination?.onChange}
        onSizeChange={options?.pagination?.onSizeChange}
      />
    </>
  );
};

export default Table;
