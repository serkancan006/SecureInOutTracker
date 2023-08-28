import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import UserActivateButton from './UserActivateButton';
import {CameraScreen} from 'react-native-camera-kit';
import colors from '../../styles/color';
import {useNavigation} from '@react-navigation/native'; // navigation hook ekleniyor
import axios from 'axios';
import {useAuth} from '../../ContextApi/AuthContext';
import {BASE_API_URL} from '@env';

const UserActivate = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState('');
  const {user, changeGirisCikis, LogOutUser} = useAuth();
  const navigation = useNavigation(); // navigation hook kullanılıyor

  /*
  useEffect(() => {
    if (opneScanner) {
      navigation.setOptions({
        tabBarStyle: {display: 'none'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex'},
      });
    }
  }, [opneScanner]);
  */

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

  const onCloseScanner = () => {
    setOpneScanner(false); // Kamera ekranını kapat
  };

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = async qrvaluee => {
    //setQrvalue(qrvalue);
    setResponse(null);
    setloading(true);
    // {"gc": "YG","address": "AnkaraDavet","boylam":"37.37","enlem":"45.36"}
    console.log(qrvaluee);
    setOpneScanner(false);
    const qrdata = JSON.parse(qrvaluee);
    console.log(qrdata.gc);
    console.log(qrdata.address);
    console.log(qrdata.boylam);
    console.log(qrdata.enlem);
    const {formattedDate, formattedTime} = getFormattedDate();
    const logData = {
      sicilno: parseInt(user.sicilno),
      uniqueid: user.deviceid.toString(),
      giris: qrdata.gc,
      tarih: formattedDate,
      saat: formattedTime,
      enlem: qrdata.enlem,
      boylam: qrdata.boylam,
      adres: qrdata.address,
    };
    //`http://84.51.47.245:45519/ords/olymposm/olympos_mobil/gc/?XID=321333&tarih=11/10/2023&gc=YG&saat=11/10/2023 12:13:14&enlem=1.1.1.1.1&boylam=2.2.2.2.2&adres=SERKANYG&BORDNO=31111`
    const apiURL = `${BASE_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;
    console.log(apiURL);

    await axios
      .post(apiURL)
      .then(response => {
        console.log(response.data);
        if (response.data.wtf === 'TRUE') {
          console.log(response.data.result_message);
          setResponse(response.data.result_message);
          setloading(false);
        } else {
          console.log('kullanıcı yok');
          setResponse(response.data.result_message);
          setloading(false);
          LogOutUser();
        }
      })
      .catch(err => {
        console.log(err);
        setloading(false);
      });
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Kamera İzni',
              message: 'Uygulamanın kamera erişimi için izine ihtiyacı var',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('KAMERA izni reddedildi');
          }
        } catch (err) {
          alert('Kamera izni hatası: ', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    <>
      {opneScanner ? (
        <SafeAreaView style={{flex: 1}}>
          <CameraScreen
            showFrame={true}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'red'}
            // Color can be of your choice
            frameColor={'white'}
            // If frame is visible then frame color
            onReadCode={event =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
          <TouchableOpacity onPress={onCloseScanner} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <View style={{padding: 5}}>

        {/* 
          <Text style={styles.textStyle}>
            {qrvalue ? 'Taranan Sonuç: ' + qrvalue : ''}
          </Text>
          {qrvalue.includes('https://') ||
          qrvalue.includes('http://') ||
          qrvalue.includes('geo:') ? (
            <TouchableHighlight onPress={onOpenlink}>
              <Text style={styles.textLinkStyle}>
                {qrvalue.includes('geo:') ? 'Open in Map' : 'Open Link'}
              </Text>
            </TouchableHighlight>
          ) : null}
        */}

          <View>
            {loading ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: colors.text,
                  }}>
                  İşlem Yapılıyor...
                </Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: colors.text,
                  }}>
                  {response}
                </Text>
              </View>
            )}
          </View>

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
                onPress={onOpneScanner}
                //style={{borderColor: 'red', borderWidth: 2}}
              />
              <UserActivateButton
                iconName="food-off"
                title="Yemek Çıkış"
                onPress={onOpneScanner}
                isDisabled={true}
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
                onPress={onOpneScanner}
              />
              <UserActivateButton
                iconName="coffee-off"
                title="Mola Çıkış"
                onPress={onOpneScanner}
                isDisabled={true}
              />
            </View>
          </View>

        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 5,
  },
  textLinkStyle: {
    color: colors.primary,
    paddingVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.errortext,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default UserActivate;
