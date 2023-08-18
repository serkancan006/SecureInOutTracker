import {useState, useEffect} from 'react';
import axios from 'axios';
import {GIRIS_API_URL} from '@env';
import { useAuth } from '../../AuthContext';

const useShareLocationRequest = ({address,location}) => {
  const [loading, setLoading] = useState(false);
  const [response, setresponse] = useState('Konum Gönder');
  const {user} = useAuth();

  function getFormattedDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Ay indeksi 0'dan başlar, Ocak = 0, Şubat = 1, ...
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}/${month}/${year}`;
    return {formattedDate, formattedTime};
  }

  setLoading(true);
  const {formattedDate, formattedTime} = getFormattedDate();
  // Gönderilecek günlük veri nesnesi
  const logData = {
    sicilno: parseInt(user.sicilno),
    uniqueid: user.deviceid.toString(),
    giris: 'K',
    tarih: formattedDate,
    saat: formattedTime,
    enlem: location ? location.latitude.toString() : null,
    boylam: location ? location.longitude.toString() : null,
    adres: address || 'Adres bilgisi alınamadı',
  };
  const apiURL = `${GIRIS_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;
  //const apiURL ='http://84.51.47.245:45519/ords/olymposm/olympos_mobil/gc/?XID=321333&tarih=11-10-2023&gc=C&saat=12:13:14&enlem=1.1.1.1.1&boylam=2.2.2.2.2&adres=SERKAN&BORDNO=1235';
  axios
    .post(apiURL)
    .then(response => {
      //console.log(response.data.result_message);
      setresponse(response.data.result_message);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });

  return [];
};

export default useShareLocationRequest;
