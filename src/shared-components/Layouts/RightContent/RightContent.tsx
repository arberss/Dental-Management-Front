import { Box } from '@mantine/core';

interface RightContentProps {
  children: JSX.Element;
}

const RightContent = ({ children }: RightContentProps) => {
  return (
    <Box
      sx={{
        padding: '20px 0',
      }}
    >
      {children}
    </Box>
  );
};

export default RightContent;
