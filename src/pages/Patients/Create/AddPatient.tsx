import { endpoints } from '@/config/endpoints';
import { usePutMutation } from '@/hooks/react-query/useMutation';
import { usePagination } from '@/hooks/react-query/usePagination';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import { Box, Button, Drawer, Flex, Grid, Text } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import * as dayjs from 'dayjs';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { useQueryClient } from 'react-query';
import { validationSchema } from './helper';
import { IAddPationFields } from './index.interface';

interface AddPatientProps {
  opened: boolean;
  onClose: () => void;
  title: string;
}

const AddPatient = ({ opened, onClose, title }: AddPatientProps) => {
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

  const initialValues: IAddPationFields = {
    firstName: '',
    parentName: '',
    lastName: '',
    dateOfBirth: dayjs().toDate(),
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    treatment: {
      name: '',
      description: '',
      price: 0,
      doctor: '',
    },
  };

  const { values, setFieldValue, resetForm, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        putMutation.mutate(values, {
          onSuccess() {
            queryClient.invalidateQueries(endpoints.patients);
            queryClient.invalidateQueries(endpoints.patientsStats);
            handleClose();
            formikHelpers.resetForm();
          },
        });
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
                  name='firstName'
                  label='First Name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('firstName', e.target.value)
                  }
                  value={values.firstName}
                  error={errors.firstName}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input
                  name='lastName'
                  label='Last Name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('lastName', e.target.value)
                  }
                  value={values.lastName}
                  error={errors.lastName}
                />
              </Grid.Col>
            </Grid>

            <Grid gutter='sm' py='4px'>
              <Grid.Col>
                <Input
                  name='parentName'
                  label='Parent Name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('parentName', e.target.value)
                  }
                  value={values.parentName}
                  error={errors.parentName}
                />
              </Grid.Col>
            </Grid>

            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <Input
                  name='contactNumber'
                  label='Contact Number'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('contactNumber', e.target.value)
                  }
                  value={values.contactNumber}
                  error={errors.contactNumber}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label='Date of birth'
                  name='dateOfBirth'
                  onChange={(value: DateValue) =>
                    setFieldValue('dateOfBirth', value)
                  }
                  value={values.dateOfBirth}
                  valueFormat='DD MMMM YYYY'
                />
              </Grid.Col>
            </Grid>

            <Text size='md' pt='md' weight='bold' color='blue.5'>
              Address
            </Text>
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <Input
                  name='address.street'
                  label='Street'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('address.street', e.target.value)
                  }
                  value={values.address.street}
                  error={errors?.address?.street}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input
                  name='address.city'
                  label='City'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('address.city', e.target.value)
                  }
                  value={values.address.city}
                  error={errors?.address?.city}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <Input
                  name='address.state'
                  label='State'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('address.state', e.target.value)
                  }
                  value={values.address.state}
                  error={errors?.address?.state}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input
                  name='address.postalCode'
                  label='Postal Code'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('address.postalCode', e.target.value)
                  }
                  value={values.address.postalCode}
                  error={errors?.address?.postalCode}
                />
              </Grid.Col>
            </Grid>

            <Text size='md' pt='md' weight='bold' color='blue.5'>
              Treatment
            </Text>
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <Input
                  name='treatment.name'
                  label='Treatment name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('treatment.name', e.target.value)
                  }
                  value={values.treatment.name}
                  error={errors?.treatment?.name}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input
                  name='treatment.description'
                  label='Description'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('treatment.description', e.target.value)
                  }
                  value={values.treatment.description}
                  error={errors?.treatment?.description}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <NumberInput
                  name='treatment.price'
                  label='Price'
                  onChange={(value: number) =>
                    setFieldValue('treatment.price', value)
                  }
                  value={values.treatment.price}
                  error={errors?.treatment?.price}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  name='treatment.doctor'
                  data={selectDoctorsData}
                  label='Doctor'
                  onChange={(value: string) =>
                    setFieldValue('treatment.doctor', value)
                  }
                  value={values.treatment.doctor}
                  searchable={true}
                  dropdownPosition='bottom'
                  error={errors?.treatment?.doctor}
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
            <Button bg='blue.8' type='submit'>
              Create
            </Button>
          </Flex>
        </form>
      </Flex>
    </Drawer>
  );
};

export default AddPatient;
