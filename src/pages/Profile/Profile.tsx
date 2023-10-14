import Loader from '@/components/Loader/Loader';
import AuthContext from '@/context/authContext';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';
import { Avatar, Box, Card, Divider, Flex, Text } from '@mantine/core';
import { useContext } from 'react';
import { cardsInfo } from './profile.helper';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (!user && loading) {
    return <Loader />;
  }

  if (!user && !loading) {
    return (
      <RightContent>
        <Text>Something went wrong!</Text>
      </RightContent>
    );
  }

  return (
    <RightContent>
      <Flex justify='center'>
        <Card
          sx={{
            width: '100%',
            maxWidth: '650px',
          }}
        >
          <Flex direction='column' justify='center' align='center'>
            <Avatar sx={{ width: '200px', height: '150px' }} />
            <Text
              align='center'
              mt='5px'
              py='3px'
              size='xl'
              weight='bold'
              sx={(theme) => ({
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[1]
                    : theme.colors.gray[8],
              })}
            >{`${user?.firstName} ${user?.lastName}`}</Text>
          </Flex>

          <Divider mt='xs' sx={{ margin: '10px 0' }} />

          {cardsInfo(user!).map((item) => {
            return (
              <Box key={item.title} my='md' sx={{ textAlign: 'center' }}>
                <Text
                  size='md'
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
                  size='md'
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
                <Divider mt='md' />
              </Box>
            );
          })}
        </Card>
      </Flex>
    </RightContent>
  );
};

export default Profile;
