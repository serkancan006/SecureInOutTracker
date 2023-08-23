import {ScrollView, Text, View} from 'react-native';
import React from 'react';
//stiller
import Pagestyles from '../../styles/Pagestyles';
import mainstyles from '../../styles/Mainstyles';
//componentler
import UserInfoComponent from '../components/UserInfoComponent';
import UserActivate from '../components/UserActivate';
import {useAuth} from '../../ContextApi/AuthContext';

const UserInfo = () => {
  const {user} = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{
        ...Pagestyles.container,
        flexGrow: 1,
        padding: 0,
      }}>
      {/*    
      <UserInfoComponent />
      */}
      {user.giris ? (
        <UserActivate />
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
