import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {NOMINATIM_URL, OPENCAGEDATE_URL, OPENCAGEDATE_API_KEY} from '@env';

const useLocationAddress = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [locationError, setlocationError] = useState(null);

  // Konumu ve adresi yenilemek için işlev
  const refreshLocation = () => {
    // Konumu ve adresi sıfırla
    setLocation(null);
    setAddress(null);
    setlocationError('Adres Bilgisi Alınıyor Lütfen Bekleyiniz...');
    // Konum iznini iste ve mevcut konumu al
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        //https://nominatim.openstreetmap.org/reverse?lat=39.887215&lon=32.82580166666666&format=json
        //const apiUrl = `${NOMINATIM_URL}/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC0ZF5k-Xz46x4WUBW8gAZTNwJ_o84FQ3s`;
        //adres api get isteği
        axios
          .get(apiUrl)
          .then(response => {
            //setAddress(response.data.display_name);
            setAddress(response.data.results[0].formatted_address);
          })
          .catch(error => {
            //console.error('nominatimdan Adres Bilgisi alınamadı. Api isteği başarısız oldu!',);
            setlocationError('internetinizi kontrol ediniz.');
          });
      },
      error => {
        //console.error('Konum bilgisi alınamadı. Lütfen Konumunuzu veya İnternetinizi açınız!!!',);
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

  // Bileşen yüklendiğinde yalnızca bir kez konum almak için kullanılır
  useEffect(() => {
    refreshLocation();
  }, []);

  // Konumu, adresi, konumu yenileme ve hata mesajı işlevini döndür
  return [location, address, refreshLocation, locationError];
};

export default useLocationAddress;
