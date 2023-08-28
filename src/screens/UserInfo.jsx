import {ScrollView, Text, View} from 'react-native';
import React from 'react';
//stiller
import Pagestyles from '../../styles/Pagestyles';
import mainstyles from '../../styles/Mainstyles';
//componentler
import UserActivate from '../components/UserActivate';
import {useAuth} from '../../ContextApi/AuthContext';
import useLocationAddress from '../CustomHook/useLocationAddress'; // Özel kancayı içe aktarın
import AdressComponent from '../components/AdressComponent';

const UserInfo = () => {
  const {user} = useAuth();
  const [location, address, refreshLocation, locationError] =
    useLocationAddress();

  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      {/*    
      <UserInfoComponent />
      */}
      {user.giris ? (
        <>
          <UserActivate location={location} address={address} />
          <AdressComponent
            address={address}
            refreshLocation={refreshLocation}
            locationError={locationError}
          />
        </>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...mainstyles.text, fontSize: 22, fontWeight: '700'}}>
            İşe Giriş Yapılmamış
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default UserInfo;
