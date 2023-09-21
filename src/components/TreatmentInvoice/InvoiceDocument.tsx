import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import InvoiceHeader from './components/InvoiceHeader';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    height: '100%',
    paddingVertical: '40px',
    paddingHorizontal: '20px',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  hr: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10
  },
});

const InvoiceDocument = () => {
  return (
    <Document style={{ height: '100%' }}>
      <Page size='A4' style={styles.page}>
        <InvoiceHeader />
        <View style={styles.hr}></View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
