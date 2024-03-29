import { endpoints } from '@/config/endpoints';
import { useQuery } from '@/hooks/react-query/useQuery';
import { Avatar, Button, Card, Divider, Flex, Grid, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import Treatments from '../Treatments/PatientTreatments/PatientTreatments';
import Loader from '@/components/Loader/Loader';
import { IPatient } from './patient.interface';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { cardsInfo } from './patient.helper';
import { useContext, useState } from 'react';
import AddPatient from '../Patients/Create/AddPatient';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import useCheckRole from '@/hooks/custom/useCheckRole';
import AuthContext from '@/context/authContext';

const Patient = () => {
  const params: Readonly<{ patientId?: string }> = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const checkRole = useCheckRole({
    roles: ['admin'],
    userRoles: user?.roles,
  });

  const [editPatientDrawerOpened, setEditPatientDrawerOpened] = useState(false);

  const { data, isLoading } = useQuery<IPatient>(
    endpoints.patient.replace('::patientId', params?.patientId ?? ''),
    {
      skip: !params?.patientId,
    }
  );

  const items = [
    { title: 'Patients', onClick: () => navigate('/patients') },
    { title: 'Patient' },
    { title: `${data?.firstName} ${data?.lastName}` },
  ];

  const handlePatientModalClose = () => {
    setEditPatientDrawerOpened(false);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <RightContent>
        <>
          <Flex
            justify='space-between'
            align='center'
            gap='xs'
            wrap='wrap'
            mb='xs'
          >
            <Breadcrumbs items={items} />
            {checkRole ? (
              <Button
                variant='white'
                sx={(theme) => ({
                  backgroundColor: theme.colors.yellow[4],
                  color: theme.colors.dark[8],
                })}
                onClick={() => setEditPatientDrawerOpened(true)}
              >
                Edit Patient
              </Button>
            ) : null}
          </Flex>
          <Grid gutter='sm'>
            <Grid.Col sm={4} md={6} lg={3} xl={4}>
              <Card
                p='lg'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                h='100%'
              >
                <Avatar size='xl' />
                <Text
                  align='center'
                  py='3px'
                  size='xl'
                  weight='bold'
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === 'dark'
                        ? theme.colors.gray[1]
                        : theme.colors.gray[8],
                  })}
                >{`${data?.firstName} ${data?.parentName} ${data?.lastName}`}</Text>
                <Text align='center' py='3px'>
                  {data?.contactNumber}
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col sm={8} md={6} lg={9} xl={8}>
              <Card p='lg' w='100%' h='100%'>
                <Grid pb='md' gutter='md'>
                  {cardsInfo(data).map((item) => {
                    return (
                      <Grid.Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        key={item.title}
                        mb='md'
                      >
                        <Text
                          size='sm'
                          weight='bold'
                          sx={(theme) => ({
                            color:
                              theme.colorScheme === 'dark'
                                ? theme.colors.gray[5]
                                : theme.colors.gray[6],
                          })}
                        >
                          {item.title}
                        </Text>
                        <Text
                          size='sm'
                          weight='bold'
                          sx={(theme) => ({
                            color:
                              theme.colorScheme === 'dark'
                                ? theme.colors.gray[1]
                                : theme.colors.gray[8],
                          })}
                        >
                          {item.value}
                        </Text>
                        <Divider mt='xs' />
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Card>
            </Grid.Col>
          </Grid>
          <Treatments />
        </>
      </RightContent>
      <AddPatient
        opened={editPatientDrawerOpened}
        onClose={handlePatientModalClose}
        title={'Edit Patient'}
        selectedEditUser={data}
      />
    </>
  );
};

export default Patient;
