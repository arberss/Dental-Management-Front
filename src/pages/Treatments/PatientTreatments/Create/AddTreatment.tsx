import { endpoints } from '@/config/endpoints';
import { usePutMutation } from '@/hooks/react-query/useMutation';
import { usePagination } from '@/hooks/react-query/usePagination';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import { Box, Button, Drawer, Flex, Grid } from '@mantine/core';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { validationSchema } from './helper';
import { IAddPatientTreatment } from './index.interface';

interface AddPatientProps {
  opened: boolean;
  onClose: () => void;
  title: string;
}

const AddTreatment = ({ opened, onClose, title }: AddPatientProps) => {
  const params: Readonly<{ patientId?: string }> = useParams();
  const queryClient = useQueryClient();

  const { data: doctors } = usePagination<{
    items: { _id: string; firstName: string; lastName: string }[];
  }>(endpoints.doctors, {
    page: 1,
    size: 10,
  });

  const selectDoctorsData =
    doctors?.items?.map((d) => {
      return {
        label: `${d.firstName} ${d.lastName}`,
        value: d._id,
      };
    }) ?? [];

  const putMutation = usePutMutation(endpoints.addPatientTreatment);

  const initialValues: IAddPatientTreatment = {
    name: '',
    description: '',
    price: undefined,
    doctor: '',
  };

  const { values, setFieldValue, resetForm, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        putMutation.mutate(
          {
            _id: params?.patientId,
            treatment: values,
          },
          {
            onSuccess() {
              queryClient.invalidateQueries(
                endpoints.patientTreatments.replace(
                  '::patientId',
                  params?.patientId ?? ''
                )
              );
              queryClient.invalidateQueries(endpoints.patientsStats);
              handleClose();
              formikHelpers.resetForm();
            },
          }
        );
      } catch (error) {
        return error;
      }
    },
  });

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={title}
      position='right'
      size='md'
      sx={{
        overflowX: 'hidden',
      }}
    >
      <Flex justify='space-between' direction='column'>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              height: '85vh',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
            className='overflowHoverVisibility'
          >
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <Input
                  name='name'
                  label='Treatment Name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('name', e.target.value)
                  }
                  value={values.name}
                  error={errors.name}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input
                  name='description'
                  label='Treatment Description'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('description', e.target.value)
                  }
                  value={values.description}
                  error={errors.description}
                />
              </Grid.Col>
            </Grid>

            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <NumberInput
                  name='price'
                  label='Treatment Price'
                  onChange={(value: number) => setFieldValue('price', value)}
                  value={values.price}
                  error={errors.price}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  name='doctor'
                  data={selectDoctorsData}
                  label='Doctor'
                  onChange={(value: string) => setFieldValue('doctor', value)}
                  value={values.doctor}
                  searchable={true}
                  dropdownPosition='bottom'
                  error={errors?.doctor}
                />
              </Grid.Col>
            </Grid>
          </Box>
          <Flex align='center' justify='flex-end' columnGap='md' mt='xs'>
            <Button
              bg='dark.3'
              sx={(theme) => ({
                '&:hover': {
                  backgroundColor: theme.colors.dark[4],
                },
              })}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              bg='blue.8'
              type='submit'
              disabled={putMutation.isLoading}
              loading={putMutation.isLoading}
            >
              Create
            </Button>
          </Flex>
        </form>
      </Flex>
    </Drawer>
  );
};

export default AddTreatment;
