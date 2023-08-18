import React, {createContext, useContext, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import colors from './styles/color';

// Kimlik doğrulama bağlamı oluşturuluyor
const AuthContext = createContext();

// Kimlik doğrulama bağlamını kullanma özel kancası tanımlanıyor
export const useAuth = () => {
  return useContext(AuthContext);
};

// Kimlik doğrulama sağlayıcısı bileşeni oluşturuluyor
const AuthProvider = ({children}) => {
  // Kullanıcı durumu ve asenkron depolama işlevleri alınıyor
  const [user, setUser] = useState();
  const {getItem, setItem} = useAsyncStorage('userData');
  const [isLoading, setIsLoading] = useState(true);

  // Depolamadan veri okuma işlevi
  const readItemFromStorage = async () => {
    const item = await getItem();
    setUser(JSON.parse(item));
    setIsLoading(false);
  };

  const LogOutUser = async () => {
    await setItem(JSON.stringify(null));
    setUser(null);
  };

  const changeGirisCikis = async () => {
    const updatedUser = {...user, giris: !user.giris};
    await setItem(JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Depolamaya veri yazma işlevi
  const registerUser = async sicilno => {
    const uniqueId = await getUniqueId();
    const userValue = {
      deviceid: uniqueId,
      sicilno: sicilno,
      giris: false,
    };
    await setItem(JSON.stringify(userValue));
    setUser(userValue);
  };

  // Bileşen yüklendiğinde depolamadan veri okuma yapılıyor
  useEffect(() => {
    readItemFromStorage();
  }, []);

  // Yükleme işlemi devam ederken bekleme durumunda "Yükleniyor..." metni gösteriliyor
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.pagebackground,
        }}>
        <Text>Sayfalar Yükleniyor...</Text>
      </View>
    );
  }

  // Kimlik doğrulama bağlamını sağlayıcı ile saran bileşen
  return (
    <AuthContext.Provider
      value={{user, registerUser, changeGirisCikis, LogOutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
