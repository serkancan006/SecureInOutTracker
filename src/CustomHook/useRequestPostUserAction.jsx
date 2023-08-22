import React, {useState} from 'react';
import {useAuth} from '../../ContextApi/AuthContext';
import axios from 'axios'; // Don't forget to import axios
// Other imports

const useRequestPostUserAction = ({location, address}) => {
  const [responseLoading, setResponseLoading] = useState(false);
  const [response, setResponse] = useState();
  const {user, changeGirisCikis, LogOutUser} = useAuth();
  const [giris, setGiris] = useState(false); // Initial value of 'giris'

  const toggleGiris = async gc => {
    setResponseLoading(true);
    const {formattedDate, formattedTime} = getFormattedDate();

    const logData = {
      sicilno: parseInt(user.sicilno),
      uniqueid: user.deviceid.toString(),
      giris: gc,
      tarih: formattedDate,
      saat: formattedTime,
      enlem: location ? location.latitude.toString() : null,
      boylam: location ? location.longitude.toString() : null,
      adres: address || 'Adres bilgisi alınamadı',
    };

    const apiURL = `${BASE_API_URL}?XID=${logData.uniqueid}&tarih=${logData.tarih}&gc=${logData.giris}&saat=${logData.saat}&enlem=${logData.enlem}&boylam=${logData.boylam}&adres=${logData.adres}&BORDNO=${logData.sicilno}`;

    try {
      const response = await axios.post(apiURL, logData);
      //console.log(response.data);

      if (response.data.wtf === 'FALSE') {
        setResponse(response.data.result_message);
        setResponseLoading(false);
        LogOutUser();
      } else {
        setResponse(response.data.result_message);
        setResponseLoading(false);
        changeGirisCikis();
        setGiris(!location);
      }
    } catch (error) {
      //console.log(error);
      setResponseLoading(false);
    }
  };

  return [response, responseLoading, toggleGiris];
};

export default useRequestPostUserAction;
