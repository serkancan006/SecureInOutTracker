import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../AuthContext';
import useLocationAddress from '../CustomHook/useLocationAddress'; // Özel kancayı içe aktarın
import axios from 'axios'; // API istekleri yapmak için Axios kütüphanesini içe aktarın
import {GIRIS_API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

const ShareLocation = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [location, address, refreshLocation, locationError] =
    useLocationAddress(); // Özel kancayı kullanın
  //const [url, seturl] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setresponse] = useState('Konum Gönder');
 
  function toggleKonum() {
    setLoading(true);
    setresponse('Konum Gönder');
    //console.log(formattedDate,formattedTime);
    // Gönderilecek günlük veri nesnesi
    const logData = {
      sicilno: parseInt(user.sicilno),
      uniqueid: '',
      giris: '',
      tarih: '',
      saat: '',
      enlem: location ? location.latitude.toString() : null,
      boylam: location ? location.longitude.toString() : null,
      adres: address || 'Adres bilgisi alınamadı',
    };

    // API isteği için gereken URL ve sorgu dizesi oluştur
    const apiURL = `${GIRIS_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;
    //const apiURL ='http://84.51.47.245:45519/ords/olymposm/olympos_mobil/gc/?XID=321333&tarih=11-10-2023&gc=C&saat=12:13:14&enlem=1.1.1.1.1&boylam=2.2.2.2.2&adres=SERKAN&BORDNO=1235';
    // API isteği gönderme post
    
    axios
      .post(apiURL)
      .then(response => {
        //console.log(response.data.result_message);
        setresponse(response.data.result_message);
      })
      .catch(error => {
        setresponse(error.message);
        //console.error('POST isteği gönderilirken bir hata oluştu:', error);
      })
      .finally(() => {
        // İstek tamamlandıktan sonra her durumda çalışır
        setLoading(false);
      });
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Home</Text>
        <Text>{user.deviceid}</Text>
        <Text>{user.sicilno}</Text>
        {/*   
            <Button title="LogOut" onPress={handleLogOut} />
               */}
        <Text
          style={{
            fontSize: 22,
            //marginVertical: 100,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {response}
        </Text>
      </View>
      <View style={{width: '100%', flex: 1}}>
        <Text
          style={{
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            fontSize: 16,
            marginBottom: 2,
            fontWeight: '400',
          }}>
          Adres Bilgisi:
        </Text>
        {address ? (
          <>
            {/*<Text>Enlem: {location.latitude}</Text>
                <Text>Boylam: {location.longitude}</Text>
                <Text>Url: {url}</Text>*/}
            <Text style={{fontSize: 15, marginBottom: 8, fontStyle: 'italic'}}>
              {address}
            </Text>
            <View style={{marginVertical: 5}}>
              <Button
                title={loading ? 'İşleniyor...' : 'Konum Gönder'}
                onPress={toggleKonum}
              />
            </View>
          </>
        ) : (
          <Text style={{fontSize: 15, marginBottom: 8, fontStyle: 'italic'}}>
            {locationError}
          </Text>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button title="Konum Yenile" onPress={refreshLocation} />
          <Button
            title="Giriş Sayfasına Git"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 5,
    alignItems: 'center',
  },
});

export default ShareLocation;
