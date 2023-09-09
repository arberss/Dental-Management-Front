import { ChangeEvent, useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import Table, { TableProps } from '@/components/Table/Table';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import Input from '@/shared-components/Form/Input/Input';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { Flex } from '@mantine/core';
import { IconReportMedical } from '@tabler/icons-react';
import Card from '@/components/Card/Card';
import { IPagination } from '@/components/Pagination/Pagination.interface';
import { IDoctor } from './doctors.interface';
import { columns } from './helper';

const Doctors = () => {
  //   const navigate = useNavigate();

  const [paginations, setPaginations] = useState<IPagination>({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [searchDoctor, setSearchDoctor] = useState('');

  const { data, isLoading, isSuccess } = usePagination<{
    items: IDoctor[];
    pageInfo: IPagination;
  }>(endpoints.doctors, {
    page: paginations.page,
    size: paginations.size,
    search: searchDoctor,
  });

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

  const cards = [
    {
      icon: <IconReportMedical size='35px' color='green' />,
      title: 'Doctors',
      value: data?.pageInfo?.totalPages ?? 0,
    },
  ];

  const handleSearchDoctor = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchDoctor(e.target.value);
  };

  if (isLoading) return <Loader />;

  return (
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
        <Flex justify='space-between' align='center' my='xs'>
          <Input
            name='doctorSearch'
            value={searchDoctor}
            onChange={handleSearchDoctor}
            placeholder='Search'
          />
        </Flex>
        <Table
          columns={columns}
          rows={data?.items ?? []}
          options={tableOptions}
          // actions={tableActions}
        />
      </>
    </RightContent>
  );
};

export default Doctors;
