import {View, Text, Button} from 'react-native';
import React from 'react';
//stiller
import mainstyles from '../../styles/Mainstyles';
import colors from '../../styles/color';

const AdressComponent = ({address, refreshLocation, locationError}) => {
  return (
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
  );
};

export default AdressComponent;
