import { Button, Menu, Flex } from '@mantine/core';
import { useState } from 'react';
import ColumnActions, { Props } from './TableActions';

const ActionData = <T extends unknown>(props: Props<T>) => {
  const { rowData, actions } = props;

  const [opened, setOpened] = useState(false);

  return (
    <Menu
      shadow='md'
      withinPortal
      styles={{
        dropdown: {
          minWidth: '100px',
        },
      }}
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <Menu.Target>
        <Button
          sx={{
            padding: '5px 10px',
            height: 'unset',
            backgroundColor: '#3d40db',
            '&:hover': {
              backgroundColor: '#3d40db',
            },
          }}
          onClick={() => setOpened(true)}
        >
          Actions
        </Button>
      </Menu.Target>
      <Menu.Dropdown sx={{ minWidth: '100px' }}>
        <Flex direction='column' gap='sm'>
          <ColumnActions
            rowData={rowData}
            actions={actions}
            setOpened={setOpened}
          />
        </Flex>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionData;
