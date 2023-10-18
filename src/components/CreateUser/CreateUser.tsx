import { endpoints } from '@/config/endpoints';
import { usePostMutation } from '@/hooks/react-query/useMutation';
import Input from '@/shared-components/Form/Input/Input';
import { Box, Button, Drawer, Flex, Grid, MultiSelect } from '@mantine/core';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { ICreateUser } from './createUser.interface';
import { validationSchema } from './createuser.helper';

interface CreateUserProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  onCreateInvalidateQueries?: () => void;
}

const CreateUser = ({
  opened,
  onClose,
  title,
  onCreateInvalidateQueries,
}: CreateUserProps) => {
  const postMutation = usePostMutation<ICreateUser>(endpoints.registerUser);

  const treatmentInitialValues: ICreateUser = {
    firstName: '',
    lastName: '',
    email: '',
    roles: ['doctor'],
  };

  const { values, setFieldValue, resetForm, errors, handleSubmit } = useFormik({
    initialValues: treatmentInitialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      try {
        postMutation.mutate(values, {
          onSuccess: () => {
            if (onCreateInvalidateQueries) {
              onCreateInvalidateQueries();
            }
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
              <Grid.Col span={6}>
                <Input
                  name='email'
                  label='Email'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('email', e.target.value)
                  }
                  value={values.email}
                  error={errors.email}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <MultiSelect
                  name='roles'
                  data={['doctor']}
                  label='Role'
                  onChange={(value: string[]) => setFieldValue('roles', value)}
                  value={values.roles}
                  searchable={true}
                  dropdownPosition='bottom'
                  error={errors?.roles}
                  disabled
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
              disabled={postMutation.isLoading}
              loading={postMutation.isLoading}
            >
              Create
            </Button>
          </Flex>
        </form>
      </Flex>
    </Drawer>
  );
};

export default CreateUser;
