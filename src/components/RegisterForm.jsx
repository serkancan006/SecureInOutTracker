import React from 'react';
import {View, Button} from 'react-native';
import {Formik} from 'formik';
import RegisterSchema from '../../Schema/RegisterSchema'; // Şemayı içe aktar
import InputComponent from './InputComponent';
import colors from '../../styles/color';

const fields = [
  {
    name: 'sicilno',
    placeholder: 'Sicil No',
    keyboardType: 'numeric',
    style: {borderColor: colors.secondary},
    maxLength: 5,
  },
  {
    name: 'sicilnoConfirm',
    placeholder: 'Sicil No Tekrar',
    keyboardType: 'numeric',
    style: {borderColor: colors.secondary},
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
        <Button
          title="Kayıt Ol"
          onPress={formikProps.handleSubmit}
          color={colors.primary}
        />
      </View>
    )}
  </Formik>
);

export default RegisterForm;
