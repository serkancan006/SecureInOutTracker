import {View, Text, Button, Platform, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
//context api
import {useAuth} from '../../AuthContext';
//style
import Pagestyles from '../../styles/Pagestyles';
import mainstyles from '../../styles/mainstyles';
import colors from '../../styles/color';
//services
import ApiService from '../services/ApiService';
//custom hook
import useLocationAddress from '../CustomHook/useLocationAddress';

const Home = () => {
  const [giris, setGiris] = useState();
  const {user, changeGirisCikis} = useAuth();
  const [location, refreshLocation, locationError] = useLocationAddress();

  async function handleReflesh() {
    refreshLocation();
    console.log(location);
    const lat = await location.latitude;
    const lon = await location.longitude;
    const response = await ApiService.getAddressFromCurrentLocation(lat, lon);
    console.log(response.data.display_name);
  }

  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      {/* 
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={mainstyles.text}>Home</Text>
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
                title={loading ? 'İşleniyor...' : giris ? 'Çıkış' : 'Giriş'}
                onPress={toggleGiris}
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
    */}
      <View>
        <Text></Text>
        <Button title="yenile" onPress={handleReflesh} />
      </View>
    </ScrollView>
  );
};

export default Home;
