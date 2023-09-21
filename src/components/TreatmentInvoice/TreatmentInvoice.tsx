import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument';
import TreatmentInvoiceModal from './TreatmentInvoiceModal';

interface TreatmentInvoiceProps {
  data: any;
  open: boolean;
  onClose: () => void;
  title: string;
}

const TreatmentInvoice = ({
  data,
  title,
  open,
  onClose,
}: TreatmentInvoiceProps) => (
  <TreatmentInvoiceModal open={open} title={title} onClose={onClose}>
    <PDFViewer height='100%'>
      <InvoiceDocument data={data} />
    </PDFViewer>
  </TreatmentInvoiceModal>
);

export default TreatmentInvoice;
