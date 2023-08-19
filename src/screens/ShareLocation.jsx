import {View, Text, Button, Platform, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../AuthContext';
import {BASE_API_URL} from '@env';
//custom state
import useLocationAddress from '../CustomHook/useLocationAddress'; // Özel kancayı içe aktarın
//stiller
import Pagestyles from '../../styles/Pagestyles';
import mainstyles from '../../styles/Mainstyles';
import colors from '../../styles/color';
//axios
import axios from 'axios';

const ShareLocation = () => {
  const [giris, setGiris] = useState();
  const {user, changeGirisCikis, LogOutUser} = useAuth();
  const [location, address, refreshLocation, locationError] =
    useLocationAddress();
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState('Konum Bilgisi Paylaş');

  useEffect(() => {
    setGiris(user.giris);
  }, []);

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

  const toggleshareLocation = async () => {
    setResponse(null);
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
    const apiURL = `${BASE_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;
    //const apiURL ='http://84.51.47.245:45519/ords/olymposm/olympos_mobil/gc/?XID=321333&tarih=11-10-2023&gc=C&saat=12:13:14&enlem=1.1.1.1.1&boylam=2.2.2.2.2&adres=SERKAN&BORDNO=1235';
    // API isteği gönderme post
    await axios
      .post(apiURL, logData)
      .then(response => {
        console.log(response.data);
        if (response.data.wtf === 'FALSE') {
          setResponse(response.data.result_message);
          setloading(false);
          LogOutUser();
        } else {
          setResponse(response.data.result_message);
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setloading(false);
      });
  };
  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}>
        <Text
          style={{
            ...mainstyles.text,
            fontSize: 22,
            textAlign: 'center',
            fontWeight: 'bold',
            color: colors.text,
          }}>
          {response}
        </Text>
      </View>

      <View>
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
                title={loading ? 'İşleniyor...' : 'Konum Paylaş'}
                onPress={toggleshareLocation}
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
