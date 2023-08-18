import {ScrollView, Text, Button} from 'react-native';
import React from 'react';
import {useAuth} from '../../AuthContext';
import Pagestyles from '../../styles/Pagestyles';
import mainstyles from '../../styles/mainstyles';
import colors from '../../styles/color';

const UserInfo = () => {
  const {user, LogOutUser} = useAuth();
  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      <Text style={{...mainstyles.text, fontSize: 16, fontWeight: 400}}>
        Kullanıcı Bilgileri
      </Text>
      <Text style={{...mainstyles.text}}>{user.deviceid}</Text>
      <Text style={{...mainstyles.text}}>{user.sicilno}</Text>
      <Button
        title="LogOut"
        onPress={() => LogOutUser()}
        color={colors.primary}
      />
    </ScrollView>
  );
};

export default UserInfo;
