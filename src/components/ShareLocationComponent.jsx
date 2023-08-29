import {View, Text, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BASE_API_URL} from '@env';
import axios from 'axios';
import {useAuth} from '../../ContextApi/AuthContext';
//stiller
import mainstyles from '../../styles/Mainstyles';
import colors from '../../styles/color';

const ShareLocationComponent = ({location, address}) => {
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState('Giriş veya Çıkış Yapınız');
  const {user, changeGirisCikis, LogOutUser} = useAuth();

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

  const toggleGiris = async () => {
    setResponse(null);
    setloading(true);
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
    //const apiURL ='http://84.51.47.245:45519/ords/olymposm/olympos_mobil/gc/?XID=321333&tarih=11-10-2023&gc=C&saat=12:13:14&enlem=1.1.1.1.1&boylam=2.2.2.2.2&adres=SERKAN&BORDNO=1235';
    const apiURL = `${BASE_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;
    // API isteği gönderme post
    await axios
      .post(apiURL, logData)
      .then(response => {
        //console.log(response.data);
        if (response.data.wtf === 'FALSE') {
          setResponse(response.data.result_message);
          setloading(false);
          LogOutUser();
        } else {
          setResponse(response.data.result_message);
          setloading(false);
          changeGirisCikis();
          setGiris(!giris);
        }
      })
      .catch(err => {
        //console.log(err);
        setloading(false);
      });
  };

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
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
      {address && (
        <View style={{marginVertical: 5}}>
          <Button
            title={loading ? 'İşleniyor...' : 'Konum Paylaş'}
            onPress={toggleGiris}
            color={colors.primary}
          />
        </View>
      )}
    </View>
  );
};

export default ShareLocationComponent;
