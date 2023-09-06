import { Button, Flex, Sx } from '@mantine/core';
import { IconFilePlus } from '@tabler/icons-react';

interface TableTopActionsProps {
  title: string;
  onClick?: () => void;
  sxWrapper?: Sx;
  sxBtn?: Sx;
}

const TableTopActions = ({
  title,
  onClick,
  sxWrapper = { margin: '10px 0' },
  sxBtn,
}: TableTopActionsProps) => {
  return (
    <Flex justify='flex-end' sx={sxWrapper}>
      <Button
        leftIcon={<IconFilePlus size={18} />}
        onClick={onClick}
        sx={sxBtn}
      >
        {title}
      </Button>
    </Flex>
  );
};

export default TableTopActions;
