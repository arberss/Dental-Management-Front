import { endpoints } from '@/config/endpoints';
import { usePutMutation } from '@/hooks/react-query/useMutation';
import AuthLayout from '@/shared-components/Layouts/Auth/AuthLayout';
import toast from '@/shared-components/toast/Toast';
import { Button, Flex, PasswordInput } from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { useFormik } from 'formik';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenParam = searchParams.get('verifyToken');

  const checkToken = () => {
    try {
      const decoded: { [key: string]: any } | null = jwt_decode(
        tokenParam ?? ''
      );
      return decoded;
    } catch (error) {
      navigate('/auth/login', { replace: true });
      toast({
        status: 'error',
        title: 'Token is not valid',
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const putMutation = usePutMutation(endpoints.verifyRegisteredUser);

  const initialValues = {
    password: '',
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        putMutation.mutate(
          {
            token: tokenParam,
            password: values.password,
          },
          {
            onSuccess: () => {
              navigate('/auth/login');
              toast({
                status: 'success',
                title: 'Account verified',
              });
              formikHelpers.resetForm();
            },
            onError: () => {
              toast({
                status: 'error',
                title: 'Token is not valid or has expired',
              });
            },
          }
        );
      } catch (error) {
        return error;
      }
    },
  });
  return (
    <AuthLayout title='Set account password'>
      <>
        <form onSubmit={formik.handleSubmit}>
          <Flex gap='md' direction='column'>
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
            <Button type='submit'>Confirm</Button>
          </Flex>
        </form>
      </>
    </AuthLayout>
  );
};

export default VerifyUser;
