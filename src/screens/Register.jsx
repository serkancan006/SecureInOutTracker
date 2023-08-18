import {ScrollView} from 'react-native';
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import {useAuth} from '../../AuthContext';
import Pagestyles from '../../styles/Pagestyles';

const Register = () => {
  const {registerUser} = useAuth();

  const handleSubmit = values => {
    //console.log(values);
    // Burada kayıt işlemleri yapılabilir
    registerUser(values.sicilno);
  };
  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      <RegisterForm handleSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default Register;
