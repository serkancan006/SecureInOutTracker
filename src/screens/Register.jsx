import {ScrollView, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../AuthContext';
import InputField from '../components/InputField'; // InputField komponentini içe aktarın
import RegisterButton from '../components/RegisterButton'; // RegisterButton komponentini içe aktarın

const Register = () => {
  const [inputValue, setInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const {registerUser} = useAuth();

  const handleButtonPress = async () => {
    // Eğer giriş değerleri boşsa uyarı göster ve fonksiyondan çık
    if (inputValue === '' || secondInputValue === '') {
      Alert.alert('Uyarı', 'Sicil numaralarını boş bırakmayınız!');
      return;
    }
    try {
      // Cihaz kimliğini (uniqueId) al
      // Eğer giriş değerleri eşleşiyorsa
      if (inputValue === secondInputValue) {
        // AsyncStorage'de veriyi kaydet

        registerUser(inputValue);
        // Diyelim ki setItem başarılı oldu, bu durumda bir yönlendirme yapabilir veya başarı mesajı gösterebilirsiniz.
        // Alert.alert('Başarılı', 'Giriş Yapılıyor');
      } else {
        // Eğer giriş değerleri eşleşmiyorsa uyarı göster
        Alert.alert('Uyarı', 'Sicil numaraları eşleşmedi!');
      }
    } catch (error) {
      // Hata durumunda hatayı konsola yaz ve bir hata mesajı göster
      //console.log('Kayıt hatası:', error);
      Alert.alert('Hata', 'Bir hata oluştu, lütfen tekrar deneyiniz.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField
        placeholder="Sicil Numaranızı Giriniz"
        value={inputValue}
        onChangeText={text => setInputValue(text.slice(0, 5))}
      />
      <InputField
        placeholder="Sicil Numaranızı Tekrar Giriniz"
        value={secondInputValue}
        onChangeText={text => setSecondInputValue(text.slice(0, 5))}
      />
      <RegisterButton onPress={handleButtonPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Register;
