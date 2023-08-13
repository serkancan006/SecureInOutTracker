import {View, Text, Image} from 'react-native';
import React from 'react';

const DavetLogo = () => {
  return (
    <View>
      <Image
        source={require('../../assets/image/davetorginalphotoAid-removed-background.png')}
        style={{width: 50, height: 50}}
        resizeMode='contain'
      />
    </View>
  );
};

export default DavetLogo;
