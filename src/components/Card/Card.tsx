import { Box, Card as CardMantine, Flex, Text } from '@mantine/core';

interface CardProps {
  icon?: JSX.Element;
  title: string;
  value: string | number;
}

const Card = ({ icon, title, value }: CardProps) => {
  return (
    <CardMantine
      shadow='sm'
      p='xl'
      radius='md'
      withBorder
      w='fit-content'
      sx={(theme) => ({
        minWidth: '220px',
        [theme.fn.smallerThan('sm')]: {
          minWidth: 'unset',
          display: 'flex',
          flexWrap: 'wrap',
          flexGrow: 1,
        },
      })}
    >
      <Flex columnGap='md' align='center'>
        <>
          {icon}
          <Box>
            <Text size='xl' weight='bold'>
              {title}
            </Text>
            <Text size='lg' weight='bold'>
              {value}
            </Text>
          </Box>
        </>
      </Flex>
    </CardMantine>
  );
};

export default Card;
