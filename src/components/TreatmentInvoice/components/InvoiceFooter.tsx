import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import signatureExample from '@/assets/images/signatureExample.png';
import stampExample from '@/assets/images/stampExample.jpeg';

interface InvoiceFooterProps {
  data: any;
}

const InvoiceFooter = ({ data }: InvoiceFooterProps) => {
  const styles = StyleSheet.create({
    contentSignature: {
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      alignItems: 'center',
      marginBottom: 30,
      position: 'relative',
    },
    contentSignatureLine: {
      width: '100%',
      height: 2,
      backgroundColor: '#000',
    },
    contentDoctorName: {
      fontSize: 11,
      marginTop: 4,
    },
    signatureImage: {
      objectFit: 'cover',
    },
    stampImage: {
      width: '80%',
      height: '80%',
      position: 'absolute',
      top: 0,
      zIndex: 2,
    },
  });

  return (
    <View style={styles.contentSignature}>
      <Image src={signatureExample} style={styles.signatureImage} />
      <Image src={stampExample} style={styles.stampImage} />
      <View style={styles.contentSignatureLine}></View>
      <Text style={styles.contentDoctorName}>Arber Salihu</Text>
    </View>
  );
};

export default InvoiceFooter;
