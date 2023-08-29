import { Box, DefaultMantineColor, Divider, Text } from '@mantine/core';

interface NavbarHeaderProps {
  title?: string;
  color?: DefaultMantineColor;
}

const NavbarHeader = ({ title = '', color = '' }: NavbarHeaderProps) => {
  return (
    <Box
    >
      <Text color={color} sx={{ padding: '5.5px 10px', textAlign: 'center' }}>
        {title}
      </Text>
      <Divider my='sm' />
    </Box>
  );
};

export default NavbarHeader;
