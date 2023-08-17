import React from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';

const InputComponent = ({field, formikProps, style}) => (
  <React.Fragment>
    <TextInput
      placeholder={field.placeholder}
      onChangeText={formikProps.handleChange(field.name)}
      onBlur={formikProps.handleBlur(field.name)}
      value={formikProps.values[field.name]}
      secureTextEntry={field.secureTextEntry}
      keyboardType={field.keyboardType || 'default'}
      style={{
        ...styles.defaultStyle, // varsayılan stil değerleri
        ...style, // dışarıdan gelen stil değerleri
      }}
      maxLength={field.maxLength}
    />
    <Text style={{color: 'red'}}>
      {formikProps.touched[field.name] && formikProps.errors[field.name]}
    </Text>
  </React.Fragment>
);

const styles = StyleSheet.create({
  defaultStyle: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default InputComponent;
