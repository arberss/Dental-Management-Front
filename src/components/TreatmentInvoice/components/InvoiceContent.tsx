import { StyleSheet, Text, View } from '@react-pdf/renderer';
import * as dayjs from 'dayjs';

interface InvoiceContentProps {
  data: any;
}

const InvoiceContent = ({ data }: InvoiceContentProps) => {
  const styles = StyleSheet.create({
    content: {
      marginVertical: 15,
    },
    contentTitle: {
      fontSize: 14,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    contentValue: {
      fontSize: 12,
      fontFamily: 'Roboto',
      border: '1px solid #A7C7E7',
      borderTop: '2px solid #A7C7E7',
      paddingTop: 10,
      paddingBottom: 5,
      paddingHorizontal: 6,
    },
  });

  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Title</Text>
        <Text style={styles.contentValue}>{data.treatment.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Description</Text>
        <Text style={styles.contentValue}>{data.treatment.description}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Date</Text>
        <Text style={styles.contentValue}>
          {dayjs().format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceContent;
