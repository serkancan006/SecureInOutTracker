import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../AuthContext';
import useLocationAddress from '../CustomHook/useLocationAddress'; // Özel kancayı içe aktarın
import axios from 'axios'; // API istekleri yapmak için Axios kütüphanesini içe aktarın
import {GIRIS_API_URL} from '@env';

const Home = () => {
  const [giris, setGiris] = useState();
  const [user, writeItemToStorage] = useAuth();
  const [location, address, refreshLocation, locationError] =
    useLocationAddress(); // Özel kancayı kullanın
  //const [url, seturl] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setresponse] = useState('Giriş veya Çıkış Yapınız');
  useEffect(() => {
    setGiris(user.giris);
  }, []);
  /*
    function handleLogOut() {
      writeItemToStorage(null);
    }
    */
  function toggleGiris() {
    setLoading(true);
    setresponse('Giriş veya Çıkış Yapınız');
    // Geçerli tarih ve saat bilgisini al
    //const currentTime = new Date();
    //const formattedTime = currentTime.toLocaleTimeString();
    //const formattedDate = currentTime.toDateString();
    //const day = currentTime.getDate().toString().padStart(2, '0');
    //const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    //const year = currentTime.getFullYear();
    //const formattedDate = `${day}-${month}-${year}`;
    //console.log(month);
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Ay indeksi 0'dan başlar, Ocak = 0, Şubat = 1, ...
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}/${month}/${year}`;

    // Gönderilecek günlük veri nesnesi
    const logData = {
      sicilno: parseInt(user.sicilno),
      uniqueid: user.deviceid.toString(),
      giris: giris ? 'C' : 'G',
      tarih: formattedDate,
      saat: formattedTime,
      enlem: location ? location.latitude.toString() : null,
      boylam: location ? location.longitude.toString() : null,
      adres: address || 'Adres bilgisi alınamadı',
    };
    // Günlük verileri JSON formatında konsola yazdır
    //console.log(JSON.stringify(logData, null, 2));
    //console.log(typeof logData.sicilno);
    //console.log(typeof logData.uniqueid);
    //console.log(typeof logData.giris);
    //console.log(typeof logData.tarih);
    //console.log(typeof logData.saat);
    //console.log(typeof logData.enlem);
    //console.log(typeof logData.boylam);
    //console.log(typeof logData.adres);

    // API isteği için gereken URL ve sorgu dizesi oluştur
    const apiURL = `${GIRIS_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;
    //const apiURL ='http://84.51.47.245:45519/ords/olymposm/olympos_mobil/gc/?XID=321333&tarih=11-10-2023&gc=C&saat=12:13:14&enlem=1.1.1.1.1&boylam=2.2.2.2.2&adres=SERKAN&BORDNO=1235';
    // API isteği gönderme post
    axios
      .post(apiURL)
      .then(response => {
        //console.log(response.data.result_message);
        setresponse(response.data.result_message);
        // Kullanıcının giriş durumunu tersine çevir
        const updatedUser = {...user, giris: !giris};
        writeItemToStorage(updatedUser);
        setGiris(!giris);
      })
      .catch(error => {
        setresponse(error.message);
        //console.error('POST isteği gönderilirken bir hata oluştu:', error);
      })
      .finally(() => {
        // İstek tamamlandıktan sonra her durumda çalışır
        setLoading(false);
      });
    // API isteği gönderme get
    /*
      axios
        .get(apiURL)
        .then(response => {
          if (giris) {
            console.log('Çıkış yapıldı');
          } else {
            console.log('Giriş yapıldı');
          }
          console.error(response.data);
        })
        .catch(error => {
          console.error('GET isteği gönderilirken bir hata oluştu:', error);
        });
        */
    //Api Deneme post
    /*
      const postData = {
        title: 'foo',
        body: 'bar',
        userId: 1,
      };
  
      axios
        .post('https://jsonplaceholder.typicode.com/posts', postData)
        .then(response => {
          console.error(response.data);
          // Kullanıcının giriş durumunu tersine çevir
          const updatedUser = {...user, giris: !giris};
          writeItemToStorage(updatedUser);
          setGiris(!giris);
        })
        .catch(error => {
          console.log(error);
        });
        */
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
        {/*
          <Text>Home</Text>
          <Text>{user.deviceid}</Text>
          <Text>{user.sicilno}</Text>
          {giris === false ? <Text>false</Text> : <Text>true</Text>}
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
                title={loading ? 'İşleniyor...' : giris ? 'Çıkış' : 'Giriş'}
                onPress={toggleGiris}
              />
            </View>
          </>
        ) : (
          <Text style={{fontSize: 15, marginBottom: 8, fontStyle: 'italic'}}>
            {locationError}
          </Text>
        )}
        <Button title="Konum Yenile" onPress={refreshLocation} />
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

export default Home;
