import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import PrimaryHeader from '@/shared-components/Header/PrimaryHeader';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { useState } from 'react';
import { columns } from './helper';
import { IPatientsResponse } from './index.interface';

const Patients = () => {
  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });

  const { data, isLoading } = usePagination<{
    items: IPatientsResponse['items'];
  }>(endpoints.patients, {
    page: paginations.page,
    size: paginations.size,
  });

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PrimaryHeader title='Patients' />
      <RightContent>
        <>
          <TableTopActions title='Add Patient' />
          <Table
            columns={columns}
            rows={data?.items ?? []}
            options={tableOptions}
          />
        </>
      </RightContent>
    </>
  );
};

export default Patients;
