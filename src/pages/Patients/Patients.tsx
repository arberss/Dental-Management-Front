import Card from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { ChangeEvent, useState } from 'react';
import { columns } from './helper';
import { IPatientsResponse } from './index.interface';
import { IconUsers } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { useQuery } from '@/hooks/react-query/useQuery';
import AddPatient from './Create/AddPatient';
import Input from '@/shared-components/Form/Input/Input';

const Patients = () => {
  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [searchPatient, setSearchPatient] = useState('');
  const [addPatientDrawerOpened, setAddPatientDrawerOpened] = useState(false);

  const { data, isLoading } = usePagination<{
    items: IPatientsResponse['items'];
  }>(endpoints.patients, {
    page: paginations.page,
    size: paginations.size,
    search: searchPatient,
  });

  const {
    data: statsData = {
      totalPatients: 0,
      totalTodayTreatments: 0,
    },
    isLoading: statsLoading,
  } = useQuery<{
    totalPatients: number;
    totalTodayTreatments: number;
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
      value: statsData?.totalTodayTreatments,
    },
  ];

  const handlePatientModalClose = () => {
    setAddPatientDrawerOpened(false);
  };

  const handleSearchPatient = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPatient(e.target.value);
  };

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
          <Flex justify='space-between' align='center'>
            <Input
              name='patientSearch'
              value={searchPatient}
              onChange={handleSearchPatient}
              placeholder='Search'
            />
            <TableTopActions
              title='Add Patient'
              onClick={() => setAddPatientDrawerOpened(true)}
            />
          </Flex>
          <Table
            columns={columns}
            rows={data?.items ?? []}
            options={tableOptions}
          />
        </>
      </RightContent>
      <AddPatient
        opened={addPatientDrawerOpened}
        onClose={handlePatientModalClose}
        title='Add Patient'
      />
    </>
  );
};

export default Patients;
