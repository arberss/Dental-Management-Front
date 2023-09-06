import ColorSchemeMode from '@/shared-components/ColorSchemeMode/ColorSchemeMode';
import { Flex, useMantineColorScheme } from '@mantine/core';
import './authLayout.scss';

interface AuthLayoutProps {
  title?: string;
  children: JSX.Element;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className='authLayout'>
      <div className={`authLayout__wrapper ${colorScheme === 'dark' ?  'authLayout__wrapper--dark' : ''}`}>
        <Flex justify="flex-end">
          <ColorSchemeMode />
        </Flex>
        <div className='authLayout__title'>{title}</div>
        <div className='authLayout__content'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
