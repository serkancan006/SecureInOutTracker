import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import ApiService from '../services/ApiService';

// Konum bilgisi ve adres almak için özel bir kancayı tanımla
const useLocationAddress = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setlocationError] = useState(null);

  // Konumu ve adresi yenilemek için işlev
  const refreshLocation = () => {
    // Konumu ve adresi sıfırla
    setLocation(null);
    setlocationError('Adres Bilgisi Alınıyor Lütfen Bekleyiniz...');
    // Konum iznini iste ve mevcut konumu al
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        //console.log(position.coords.latitude);
        setLocation(position.coords);
      },
      error => {
        setlocationError(
          'Konum bilgisi alınamadı. Lütfen Konumunuzu ve İnternetinizi kontrol ediniz.',
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    refreshLocation();
  }, []);

  return [location, refreshLocation, locationError];
};

export default useLocationAddress;
