import { Document, Page, View, StyleSheet, Font } from '@react-pdf/renderer';
import InvoiceHeader from './components/InvoiceHeader';
import FontRobotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf';
import FontRobotoRegular from '../../assets/fonts/Roboto/Roboto-Regular.ttf';
import FontRobotoItalic from '../../assets/fonts/Roboto/Roboto-Italic.ttf';
import InvoiceContent from './components/InvoiceContent';
import InvoiceFooter from './components/InvoiceFooter';

const styles = StyleSheet.create({
  page: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  hr: {
    width: '100%',
    height: 5,
    backgroundColor: '#000',
    marginVertical: 5,
  },
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: FontRobotoRegular,
    },
    {
      src: FontRobotoBold,
      fontWeight: 'bold',
    },
    {
      src: FontRobotoItalic,
      fontStyle: 'italic',
    },
  ],
});

interface InvoiceDocumentProps {
  data: any;
}

const InvoiceDocument = ({ data }: InvoiceDocumentProps) => {
  return (
    <Document style={{ height: '100%' }}>
      <Page size='A4' style={styles.page}>
        <View>
          <InvoiceHeader data={data} />
          <View style={styles.hr}></View>
          <InvoiceContent data={data} />
        </View>
        <View>
          <InvoiceFooter data={data} />
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
