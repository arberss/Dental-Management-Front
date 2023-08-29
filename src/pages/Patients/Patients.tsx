import Card from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { useState } from 'react';
import { columns } from './helper';
import { IPatientsResponse } from './index.interface';
import { IconUsers } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { useQuery } from '@/hooks/react-query/useQuery';
import AddPatient from './Create/AddPatient';

const Patients = () => {
  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [addPatientDrawerOpened, setAddPatientDrawerOpened] = useState(false);

  const { data, isLoading } = usePagination<{
    items: IPatientsResponse['items'];
  }>(endpoints.patients, {
    page: paginations.page,
    size: paginations.size,
  });

  const {
    data: statsData = {
      totalPatients: 0,
      totalTodayPatients: 0,
    },
    isLoading: statsLoading,
  } = useQuery<{
    totalPatients: number;
    totalTodayPatients: number;
  }>(endpoints.patientsStats);

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

  const cards = [
    {
      icon: <IconUsers size='35px' color='green' />,
      title: 'Patients',
      value: statsData?.totalPatients,
    },
    {
      icon: <IconUsers size='35px' color='green' />,
      title: 'Today',
      value: statsData?.totalTodayPatients,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

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
          <TableTopActions
            title='Add Patient'
            onClick={() => setAddPatientDrawerOpened(true)}
          />
          <Table
            columns={columns}
            rows={data?.items ?? []}
            options={tableOptions}
          />
        </>
      </RightContent>
      <AddPatient
        opened={addPatientDrawerOpened}
        onClose={() => setAddPatientDrawerOpened(false)}
        title='Add Patient'
      />
    </>
  );
};

export default Patients;
