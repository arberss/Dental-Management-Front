import { endpoints } from '@/config/endpoints';
import useGetDoctorsList from '@/hooks/custom/useGetDoctorsList';
import {
  usePostMutation,
  usePutMutation,
} from '@/hooks/react-query/useMutation';
import Input from '@/shared-components/Form/Input/Input';
import Select from '@/shared-components/Form/Select/Select';
import toast from '@/shared-components/toast/Toast';
import { Box, Button, Drawer, Flex, Grid } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useFormik } from 'formik';
import { ChangeEvent, ReactNode, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import {
  initialValues,
  ISchedule,
  statusList,
  validationSchema,
} from './helper';

interface AddEventProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  selectedEvent?: ISchedule;
}

const AddEvent = ({ opened, title, onClose, selectedEvent }: AddEventProps) => {
  const queryClient = useQueryClient();
  const editMode = !!selectedEvent;

  const { data: doctors } = useGetDoctorsList();

  const postMutate = usePostMutation(endpoints.addScheduler);
  const putMutate = usePutMutation(endpoints.updateScheduler);

  const { values, setFieldValue, resetForm, errors, handleSubmit } =
    useFormik<ISchedule>({
      initialValues: selectedEvent ?? initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        try {
          if (editMode) {
            putMutate.mutate(values);
          } else {
            postMutate.mutate(values);
          }
        } catch (error) {
          return error;
        }
      },
    });

  useEffect(() => {
    if ([postMutate.isSuccess, putMutate.isSuccess].includes(true)) {
      queryClient.invalidateQueries(endpoints.getSchedulers);
      resetForm();
      onClose();
    }

    if ([postMutate.isError, putMutate.isError].includes(true)) {
      const error = postMutate.isError ? postMutate.error : putMutate.error;
      toast({
        status: 'error',
        title: error?.response.data.message,
      });
    }
  }, [
    postMutate.isSuccess,
    postMutate.isError,
    putMutate.isSuccess,
    putMutate.isError,
  ]);

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
      size='sm'
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
                  name='title'
                  label='Title'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('title', e.target.value)
                  }
                  value={values.title}
                  error={errors.title}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <DateTimePicker
                  name='startDate'
                  label='Start Date'
                  onChange={(value: Date) => setFieldValue('startDate', value)}
                  value={values.startDate}
                  error={errors.startDate as ReactNode}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateTimePicker
                  name='endDate'
                  label='End Date'
                  onChange={(value: Date) => setFieldValue('endDate', value)}
                  value={values.endDate}
                  error={errors.endDate as ReactNode}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter='sm' py='4px'>
              <Grid.Col span={6}>
                <Select
                  name='status'
                  data={statusList}
                  label='Status'
                  onChange={(value: string) => setFieldValue('status', value)}
                  value={values.status}
                  dropdownPosition='bottom'
                  error={errors?.status}
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
              disabled={postMutate.isLoading || putMutate.isLoading}
              loading={postMutate.isLoading || putMutate.isLoading}
            >
              {editMode ? 'Update' : 'Create'}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Drawer>
  );
};

export default AddEvent;
