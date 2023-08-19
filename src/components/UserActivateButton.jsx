import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../styles/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserActivateButton = ({iconName, title, onPress, style, isDisabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isDisabled ? styles.disabledButton : null, style]}
      onPress={onPress}
      disabled={isDisabled}>
      <View style={{marginBottom: 3}}>
        <Icon name={iconName} size={50} color={colors.primary} />
      </View>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    height:100,
    width: 130,
    
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: colors.gray,
  },
  buttonText: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default UserActivateButton;
