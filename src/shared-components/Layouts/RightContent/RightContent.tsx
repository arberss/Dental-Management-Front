import { Box } from '@mantine/core';

interface RightContentProps {
  children: JSX.Element;
}

const RightContent = ({ children }: RightContentProps) => {
  return <Box pt='xs'>{children}</Box>;
};

export default RightContent;
