import {View, Text, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
//özel kancalar
import useShareLocationRequest from '../CustomHook/useShareLocationRequest';
//stiller
import Pagestyles from '../../styles/Pagestyles';
import colors from '../../styles/color';
import mainstyles from '../../styles/mainstyles';

const ShareLocation = () => {
  const [location, address, refreshLocation, locationError] =
    useLocationAddress();
  const [sharelocationresponse] = useShareLocationRequest(address, location);

  function toggleKonum() {}
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
          {sharelocationresponse}
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
          title="Konum Aç/Yenile"
          onPress={refreshLocation}
          color={colors.primary}
        />
      </View>
    </ScrollView>
  );
};

export default ShareLocation;
