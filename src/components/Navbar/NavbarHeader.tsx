import ColorSchemeMode from '@/shared-components/ColorSchemeMode/ColorSchemeMode';
import { Box, DefaultMantineColor, Divider, Flex, Text } from '@mantine/core';

interface NavbarHeaderProps {
  title?: string;
  color?: DefaultMantineColor;
}

const NavbarHeader = ({ title = '', color = '' }: NavbarHeaderProps) => {
  return (
    <Box>
      <Flex justify='space-between' align='center' p='md'>
        <Text color={color}>{title}</Text>
        <ColorSchemeMode />
      </Flex>
      <Divider p='0' />
    </Box>
  );
};

export default NavbarHeader;
