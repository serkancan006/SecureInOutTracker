import {useState} from 'react';
import axios from 'axios';

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  const sendPostRequest = async (url, requestData, updateUser, setGiris) => {
    setLoading(true);

    try {
      const response = await axios.post(url, requestData);
      setResponse(response.data.result_message);
      updateUser();
      setGiris(prevGiris => !prevGiris);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, response, error, sendPostRequest};
};

export default useApiRequest;
