import {ScrollView, Text} from 'react-native';
import React from 'react';
import RegisterForm from '../componenets/RegisterForm';
import {useAuth} from '../../AuthContext';

const Register = () => {
  const {registerUser} = useAuth();

  const handleSubmit = values => {
    //console.log(values);
    // Burada kayıt işlemleri yapılabilir
    registerUser(values.sicilno);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 5,
      }}>
      <RegisterForm handleSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default Register;
