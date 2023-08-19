// UserActivate.js
import {View} from 'react-native';
import React from 'react';
import UserActivateButton from './UserActivateButton';

function handleGirisCikis(gcurlparam) {
  console.log(gcurlparam, ' işlemi yapıldı');
}

const UserActivate = () => {
  return (
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
          onPress={() => handleGirisCikis('YG')}
          //style={{borderColor: 'red', borderWidth: 2}}
        />
        <UserActivateButton
          iconName="food-off"
          title="Yemek Çıkış"
          onPress={() => handleGirisCikis('YC')}
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
          onPress={() => handleGirisCikis('MG')}
        />
        <UserActivateButton
          iconName="coffee-off"
          title="Mola Çıkış"
          onPress={() => handleGirisCikis('MC')}
          isDisabled={true}
        />
      </View>
    </View>
  );
};

export default UserActivate;
