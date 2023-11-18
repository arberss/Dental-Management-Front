import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import Card from '@/components/Card/Card';
import { useQuery } from '@/hooks/react-query/useQuery';
import { endpoints } from '@/config/endpoints';
import { IconUsers } from '@tabler/icons-react';
import { Flex, Text } from '@mantine/core';
import Loader from '@/components/Loader/Loader';
import { cardData } from './stats.helper';
import { Fragment } from 'react';

interface StatsResponse {
  totalPatients: number;
  totalTodayTreatments: number;
  earnings: number;
  totalTreatments: number;
  currentMonthEarnings: number;
  currentMonthTreatments: number;
}

const Stats = () => {
  const { data, isLoading } = useQuery<StatsResponse>(
    endpoints.allStats,
    {},
    {
      staleTime: 0,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <RightContent>
      <>
        {cardData.map((item) => {
          return (
            <Fragment key={item.title}>
              <Text size='xl' weight='bold' mt='xl' mb='2px'>
                {item.title}
              </Text>
              <Flex direction='row' gap='15px' wrap='wrap'>
                {item.data.map((dataItem) => {
                  return (
                    <Card
                      key={dataItem.key}
                      icon={
                        dataItem?.icon ? (
                          dataItem.icon
                        ) : (
                          <IconUsers size='35px' color='green' />
                        )
                      }
                      title={dataItem.title}
                      value={`${data?.[dataItem.key as keyof StatsResponse]!} ${
                        dataItem?.money ? '€' : ''
                      }`}
                    />
                  );
                })}
              </Flex>
            </Fragment>
          );
        })}
      </>
    </RightContent>
  );
};

export default Stats;
