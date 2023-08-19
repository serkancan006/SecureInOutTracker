import {ScrollView, View} from 'react-native';
import React from 'react';
//stiller
import Pagestyles from '../../styles/Pagestyles';
//componentler
import UserInfoComponent from '../components/UserInfoComponent';
import UserActivate from '../components/UserActivate';

const UserInfo = () => {
  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      {/*    
      <UserInfoComponent />
      */}
      <UserActivate />
    </ScrollView>
  );
};

export default UserInfo;
