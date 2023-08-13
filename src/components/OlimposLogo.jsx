import {View, Text} from 'react-native';
import React from 'react';

const DavetLogo = () => {
  return (
    <View>
      <Image
        source={require('../../assets/image/olimposorginalphotoAid-removed-background.png')}
        style={{width: 50, height: 50}}
        resizeMode="contain"
      />
    </View>
  );
};

export default DavetLogo;
