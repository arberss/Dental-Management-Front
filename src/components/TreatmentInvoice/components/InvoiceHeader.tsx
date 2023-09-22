import { Text, View, StyleSheet } from '@react-pdf/renderer';
import * as dayjs from 'dayjs';

// Create styles
const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerClinicTitle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  headerTime: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  headerClinicName: {
    fontSize: 11,
    fontFamily: 'Roboto',
    marginVertical: 2,
  },
  headerReportTitle: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
});

const {
  VITE_CLINIC_NAME,
  VITE_CLINIC_COUNTRY,
  VITE_CLINIC_CITY,
  VITE_CLINIC_STREET,
  VITE_CLINIC_EMAIL,
  VITE_CLINIC_NUMBER,
} = import.meta.env;

interface InvoiceHeaderProps {
  data: any;
}

const InvoiceHeader = ({ data }: InvoiceHeaderProps) => {
  return (
    <View>
      <View style={styles.headerWrapper}>
        <View>
          <Text style={styles.headerClinicTitle}>{VITE_CLINIC_NAME}</Text>
          <Text style={styles.headerClinicName}>
            {VITE_CLINIC_STREET}, {VITE_CLINIC_CITY}
          </Text>
          <Text style={styles.headerClinicName}>{VITE_CLINIC_COUNTRY}</Text>
          <Text style={styles.headerClinicName}>{VITE_CLINIC_NUMBER}</Text>
          <Text style={styles.headerClinicName}>{VITE_CLINIC_EMAIL}</Text>
        </View>
        <View>
          <Text
            style={styles.headerClinicName}
          >{`${data.patient.firstName} ${data.patient.lastName}`}</Text>
          <Text style={styles.headerClinicName}>
            {dayjs(data.patient.dateOfBirth).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.headerClinicName}>
            {data.patient?.contactNumber}
          </Text>
          <Text
            style={styles.headerClinicName}
          >{`${data.patient.address.city}, ${data.patient.address.state}`}</Text>
        </View>
      </View>
      <Text style={styles.headerReportTitle}>RAPORTI I MJEKUT</Text>
    </View>
  );
};

export default InvoiceHeader;
