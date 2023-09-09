import { Button, Flex, Modal, Text } from '@mantine/core';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmModalProps) => {
  return (
    <Modal
      opened={isOpen}
      size='md'
      onClose={onClose}
      title={title}
      closeOnClickOutside={true}
      centered
    >
      <Text size={16} align='center'>
        {description}
      </Text>
      <Flex columnGap={10} sx={{ marginTop: 10 }}>
        <Button
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[3],
            color: theme.colors.gray[0],
            width: '100%',
            marginTop: 10,
            fontSize: 16,
          })}
          variant='white'
          color='dark'
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          sx={(theme) => ({
            color: theme.colors.gray[0],
            width: '100%',
            marginTop: 10,
            fontSize: 16,
          })}
          variant='white'
          color='blue'
          onClick={() => onConfirm()}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConfirmModal;
