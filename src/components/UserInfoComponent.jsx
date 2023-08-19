import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAuth} from '../../AuthContext';
import mainstyles from '../../styles/Mainstyles';
import colors from '../../styles/color';

const UserInfoComponent = () => {
  const {user, LogOutUser} = useAuth();
  return (
    <View>
      <Text style={{...mainstyles.text, fontSize: 16, fontWeight: 400}}>
        Kullanıcı Bilgileri
      </Text>
      <Text style={{...mainstyles.text}}>{user.deviceid}</Text>
      <Text style={{...mainstyles.text}}>{user.sicilno}</Text>
      <Text style={{...mainstyles.text}}>
        {user.giris ? 'giriş true giriş yapmış' : 'giriş false çıkış yapmış'}
      </Text>
      <Button
        title="LogOut"
        onPress={() => LogOutUser()}
        color={colors.primary}
      />
    </View>
  );
};

export default UserInfoComponent;
