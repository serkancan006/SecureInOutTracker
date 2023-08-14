import React, {createContext, useContext, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

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
  const [isLoading, setIsLoading] = useState(false);

  // Depolamadan veri okuma işlevi
  const readItemFromStorage = async () => {
    setIsLoading(true);
    const item = await getItem();
    setUser(JSON.parse(item));
    setIsLoading(false);
  };

  const updateUser = async () => {
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
    return <Text>Loading...</Text>;
  }

  // Kimlik doğrulama bağlamını sağlayıcı ile saran bileşen
  return (
    <AuthContext.Provider value={{user, registerUser, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
