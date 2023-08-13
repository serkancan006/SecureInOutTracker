import React, {createContext, useContext, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';

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

  // Depolamaya veri yazma işlevi
  const writeItemToStorage = async newValue => {
    await setItem(JSON.stringify(newValue));
    setUser(newValue);
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
    <AuthContext.Provider value={[user, writeItemToStorage]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
