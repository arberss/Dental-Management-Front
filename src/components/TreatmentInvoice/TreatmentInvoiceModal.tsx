import { Box, Button, Modal } from '@mantine/core';

interface TreatmentInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
}

const TreatmentInvoiceModal = ({
  title,
  open,
  onClose,
  children,
}: TreatmentInvoiceModalProps) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      size='xl'
      styles={{
        body: {
          height: '100%',
        },
        content: {
          height: '100%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default TreatmentInvoiceModal;
