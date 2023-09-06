import Input from '@/shared-components/Form/Input/Input';
import { Button, Flex, PasswordInput} from '@mantine/core';
import AuthLayout from '@/shared-components/Layouts/Auth/AuthLayout';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from './helper';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { usePostMutation } from '@/hooks/react-query/useMutation';
import { endpoints } from '@/config/endpoints';
import AuthContext from '@/context/authContext';
import { useContext } from 'react';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  token: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const postMutation = usePostMutation<LoginResponse>(endpoints.login);

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        postMutation.mutate(values, {
          onSuccess: (data) => {
            handleLogin(data.token);

            formikHelpers.resetForm();
            navigate('/');
          },
        });
      } catch (error) {
        return error;
      }
    },
  });

  return (
      <AuthLayout title='Login'>
        <>
          <form onSubmit={formik.handleSubmit}>
            <Flex gap='md' direction='column'>
              <Input
                name='email'
                label='Email'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
              <PasswordInput
                name='password'
                label='Password'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
                visibilityToggleIcon={({ reveal, size }) =>
                  reveal ? (
                    <IconEyeOff size={size} />
                  ) : (
                    <IconEyeCheck size={size} />
                  )
                }
              />
              <Button type='submit'>Login</Button>
            </Flex>
          </form>
        </>
      </AuthLayout>
  );
};

export default Login;
