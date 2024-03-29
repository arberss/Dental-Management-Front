import { endpoints } from '@/config/endpoints';
import useGetDoctorsList from '@/hooks/custom/useGetDoctorsList';
import { usePutMutation } from '@/hooks/react-query/useMutation';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import {
  Box,
  Button,
  Drawer,
  Flex,
  Grid,
  SelectItem,
  Textarea,
} from '@mantine/core';
import { useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validationSchema } from './addTreatment.helper';
import { IAddPatientTreatment, Treatment } from './index.interface';

interface AddPatientProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  selectedData?: (Treatment & { viewMode?: boolean }) | null;
  onCreateInvalidateQueries?: () => void;
  onUpdateInvalidateQueries?: () => void;
}

const AddTreatment = ({
  opened,
  onClose,
  title,
  selectedData,
  onCreateInvalidateQueries,
  onUpdateInvalidateQueries,
}: AddPatientProps) => {
  const params: Readonly<{ patientId?: string }> = useParams();
  const editMode = !!selectedData;
  const viewMode = selectedData?.viewMode;

  const [search, setSearch] = useState('');

  const { data: doctors } = useGetDoctorsList({ search });

  const putMutation = usePutMutation(endpoints.addPatientTreatment);
  const putMutationUpdate = usePutMutation(endpoints.updateTreatment);

  const treatmentInitialValues: IAddPatientTreatment = {
    name: '',
    description: '',
    price: undefined,
    doctor: '',
  };

  const initialValues = editMode ? selectedData : treatmentInitialValues;

  const { values, setFieldValue, resetForm, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      try {
        if (editMode) {
          putMutationUpdate.mutate(values, {
            onSuccess() {
              if (onUpdateInvalidateQueries) {
                onUpdateInvalidateQueries();
              }

              handleClose();
              formikHelpers.resetForm();
            },
          });
        } else {
          putMutation.mutate(
            {
              _id: params?.patientId,
              treatment: values,
            },
            {
              onSuccess() {
                if (onCreateInvalidateQueries) {
                  onCreateInvalidateQueries();
                }
                handleClose();
                formikHelpers.resetForm();
              },
            }
          );
        }
      } catch (error) {
        return error;
      }
    },
  });

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const onDoctorFilter = (value: string, _selectedItem: SelectItem) => {
    setSearch(value);
    return true;
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
              <Grid.Col span={12}>
                <Input
                  name='name'
                  label='Treatment Name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('name', e.target.value)
                  }
                  value={values.name}
                  error={errors.name}
                  disabled={viewMode}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={12}>
                <Textarea
                  name='description'
                  label='Treatment Description'
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFieldValue('description', e.target.value)
                  }
                  minRows={4}
                  value={values.description}
                  error={errors.description}
                  disabled={viewMode}
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
                  disabled={viewMode}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  name='doctor'
                  data={doctors}
                  label='Doctor'
                  onChange={(value: string) => setFieldValue('doctor', value)}
                  value={values.doctor}
                  searchable={true}
                  dropdownPosition='bottom'
                  error={errors?.doctor}
                  filter={onDoctorFilter}
                  disabled={viewMode}
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
            {opened && !viewMode && (
              <Button
                bg='blue.8'
                type='submit'
                disabled={putMutation.isLoading || putMutationUpdate.isLoading}
                loading={putMutation.isLoading || putMutationUpdate.isLoading}
              >
                {editMode ? 'Edit' : 'Create'}
              </Button>
            )}
          </Flex>
        </form>
      </Flex>
    </Drawer>
  );
};

export default AddTreatment;
