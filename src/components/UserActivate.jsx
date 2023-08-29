import {View, Text, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BASE_API_URL} from '@env';
import axios from 'axios';
import {useAuth} from '../../ContextApi/AuthContext';
//stiller
import mainstyles from '../../styles/Mainstyles';
import colors from '../../styles/color';
import UserActivateButton from './UserActivateButton';
import LottieView from 'lottie-react-native';

const UserActivate = ({location, address}) => {
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState('Giriş veya Çıkış Yapınız');
  const [responseStatus, setresponseStatus] = useState();
  const {user, LogOutUser} = useAuth();

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

  const toggleGiris = async paramgc => {
    setResponse(null);
    setloading(true);
    const {formattedDate, formattedTime} = getFormattedDate();
    // Gönderilecek günlük veri nesnesi
    const logData = {
      sicilno: parseInt(user.sicilno),
      uniqueid: user.deviceid.toString(),
      giris: paramgc,
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
          setresponseStatus('hata');
        } else {
          setResponse(response.data.result_message);
          setloading(false);
          setresponseStatus('200');
        }
      })
      .catch(err => {
        //console.log(err);
        setloading(false);
        setresponseStatus('hata');
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
        {loading ? (
          <Text>İşleniyor...</Text>
        ) : (
          <>
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
            {responseStatus === '200' ? (
              <LottieView
                source={require('../../assets/animations/succesfull.json')}
                autoPlay
                loop
                style={{width: 50, height: 50, marginTop: 8}}
              />
            ) : responseStatus === 'hata' ? (
              <LottieView
                source={require('../../assets/animations/unsuccesfull.json')}
                autoPlay
                loop
                style={{width: 50, height: 50, marginTop: 8}}
              />
            ) : null}
          </>
        )}
      </View>
      {address && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 6,
            }}>
            <UserActivateButton
              iconName="food"
              title="Yemek Giriş"
              onPress={() => toggleGiris('YG')}
              //style={{borderColor: 'red', borderWidth: 2}}
            />
            <UserActivateButton
              iconName="food-off"
              title="Yemek Çıkış"
              onPress={() => toggleGiris('YC')}
              //isDisabled={true}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 6,
            }}>
            <UserActivateButton
              iconName="coffee"
              title="Mola Giriş"
              onPress={() => toggleGiris('MB')}
            />
            <UserActivateButton
              iconName="coffee-off"
              title="Mola Çıkış"
              onPress={() => toggleGiris('MS')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default UserActivate;
