import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import FontRobotoBold from '../../../fonts/Roboto/Roboto-Bold.ttf';
import FontRobotoRegular from '../../../fonts/Roboto/Roboto-Regular.ttf';
import FontRobotoItalic from '../../../fonts/Roboto/Roboto-Italic.ttf';

// Create styles
const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerClinicTitle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  headerClinicName: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginVertical: 2,
  },
});

const dentalName = import.meta.env.VITE_CLINIC_NAME;

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

const InvoiceHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <View>
        <Text style={styles.headerClinicTitle}>{dentalName}</Text>
        <Text style={styles.headerClinicName}>Dardani, Prishtine</Text>
        <Text style={styles.headerClinicName}>tel no</Text>
        <Text style={styles.headerClinicName}>test@test.com</Text>
      </View>
      <View>
        <Text style={styles.headerClinicTitle}>Invoice</Text>
        <Text style={styles.headerClinicName}>Filan Fisteki</Text>
        <Text style={styles.headerClinicName}>tel no</Text>
        <Text style={styles.headerClinicName}>email</Text>
      </View>
    </View>
  );
};

export default InvoiceHeader;
