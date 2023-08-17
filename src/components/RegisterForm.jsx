import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import RegisterSchema from '../../Schema/RegisterSchema'; // Şemayı içe aktar
import InputComponent from './InputComponent';

const fields = [
  {
    name: 'sicilno',
    placeholder: 'Sicil No',
    keyboardType: 'numeric',
    style: {borderColor: 'blue'},
    maxLength: 5,
  },
  {
    name: 'sicilnoConfirm',
    placeholder: 'Sicil No Tekrar',
    keyboardType: 'numeric',
    style: {borderColor: 'blue'},
    maxLength: 5,
  },
];

const RegisterForm = ({handleSubmit}) => (
  <Formik
    initialValues={{sicilno: '', sicilnoConfirm: ''}}
    validationSchema={RegisterSchema}
    onSubmit={handleSubmit}>
    {formikProps => (
      <View>
        {fields.map(field => (
          <InputComponent
            key={field.name}
            field={field}
            formikProps={formikProps}
            style={field.style}
          />
        ))}
        <Button title="Kayıt Ol" onPress={formikProps.handleSubmit} />
      </View>
    )}
  </Formik>
);

export default RegisterForm;
