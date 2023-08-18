import {View, Text, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../AuthContext';
import useLocationAddress from '../CustomHook/useLocationAddress'; // Özel kancayı içe aktarın
import axios from 'axios'; // API istekleri yapmak için Axios kütüphanesini içe aktarın
import {GIRIS_API_URL} from '@env';
import Pagestyles from '../../styles/Pagestyles';
import colors from '../../styles/color';
import mainstyles from '../../styles/mainstyles';

const ShareLocation = () => {
  const {user} = useAuth();
  const [location, address, refreshLocation, locationError] =
    useLocationAddress(); // Özel kancayı kullanın
  //const [url, seturl] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setresponse] = useState('Konum Gönder');
  function getFormattedDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Ay indeksi 0'dan başlar, Ocak = 0, Şubat = 1, ...
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}/${month}/${year}`;
    return {formattedDate, formattedTime};
  }
  function toggleKonum() {
    setLoading(true);
    setresponse('Konum Gönder');
    //console.log(formattedDate,formattedTime);
    // Gönderilecek günlük veri nesnesi
    const {formattedDate, formattedTime} = getFormattedDate();
    // Gönderilecek günlük veri nesnesi
    const logData = {
      sicilno: parseInt(user.sicilno),
      uniqueid: user.deviceid.toString(),
      giris: 'K',
      tarih: formattedDate,
      saat: formattedTime,
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
        console.log(response.data);
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
    <ScrollView contentContainerStyle={Pagestyles.container}>
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...mainstyles.text,
            fontSize: 22,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {response}
        </Text>
      </View>
      <View style={{width: '100%', flex: 1}}>
        <Text
          style={{
            ...mainstyles.text,
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
            <Text
              style={{
                ...mainstyles.text,
                fontSize: 15,
                marginBottom: 8,
                fontStyle: 'italic',
              }}>
              {address}
            </Text>
            <View style={{marginVertical: 5}}>
              <Button
                title={loading ? 'İşleniyor...' : 'Konum Gönder'}
                onPress={toggleKonum}
                color={colors.primary}
              />
            </View>
          </>
        ) : (
          <Text
            style={{
              ...mainstyles.errortext,
              fontSize: 15,
              marginBottom: 8,
              fontStyle: 'italic',
            }}>
            {locationError}
          </Text>
        )}
        <Button
          title="Konum Yenile"
          onPress={refreshLocation}
          color={colors.primary}
        />
      </View>
    </ScrollView>
  );
};

export default ShareLocation;
