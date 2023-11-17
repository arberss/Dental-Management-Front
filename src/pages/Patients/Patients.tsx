import Card from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { ChangeEvent, useEffect, useState } from 'react';
import { columns } from './createPatient.helper';
import { IconUsers } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { useQuery } from '@/hooks/react-query/useQuery';
import AddPatient from './Create/AddPatient';
import Input from '@/shared-components/Form/Input/Input';
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../Patient/patient.interface';
import { Actions } from '@/components/Table/actions/TableActions';
import { IPagination } from '@/components/Pagination/Pagination.interface';
import useDebounce from '@/hooks/custom/useDebounce';

const Patients = () => {
  const navigate = useNavigate();

  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [searchPatient, setSearchPatient] = useState('');
  const [addPatientDrawerOpened, setAddPatientDrawerOpened] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState<{
    [key: string]: any;
  } | null>(null);

  const debouncedSearch = useDebounce(searchPatient, 500);

  const { data, isLoading, isSuccess } = usePagination<{
    items: IPatient[];
    pageInfo: IPagination;
  }>(endpoints.patients, {
    page: paginations.page,
    size: paginations.size,
    search: debouncedSearch,
  });

  const {
    data: statsData = {
      totalPatients: 0,
      totalTodayTreatments: 0,
    },
  } = useQuery<{
    totalPatients: number;
    totalTodayTreatments: number;
  }>(endpoints.patientsStats);

  useEffect(() => {
    if (isSuccess) {
      setPaginations({
        ...paginations,
        totalPages: data.pageInfo.totalPages,
      });
    }
  }, [isSuccess]);

  const tableOptions: TableProps['options'] = {
    tableTitle: '',
    actionColumn: {
      frozen: true,
      position: 'left',
      width: 150,
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
      text: 'Details',
      sx: (theme) => ({
        backgroundColor: theme.colors.indigo[5],
        color: theme.colors.gray[1],
      }),
      action: (): void => {
        navigate(`/patients/patient/${rowData?._id}`);
      },
    }),
  ];

  const cards = [
    {
      icon: <IconUsers size='35px' color='green' />,
      title: 'Patients',
      value: statsData?.totalPatients,
    },
    {
      icon: <IconUsers size='35px' color='green' />,
      title: 'Treatments Today',
      value: statsData?.totalTodayTreatments,
    },
  ];

  const handlePatientModalClose = () => {
    setAddPatientDrawerOpened(false);
    setSelectedEditUser(null);
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
          <Flex justify='space-between' align='center' gap='md'>
            <Input
              name='patientSearch'
              value={searchPatient}
              onChange={handleSearchPatient}
              placeholder='Search'
              sx={{
                width: '100%',
              }}
              styles={{
                input: {
                  maxWidth: '250px',
                  width: '100%',
                },
              }}
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
            actions={tableActions}
          />
        </>
      </RightContent>
      <AddPatient
        opened={addPatientDrawerOpened}
        onClose={handlePatientModalClose}
        title={selectedEditUser ? 'Edit Patient' : 'Add Patient'}
      />
    </>
  );
};

export default Patients;
