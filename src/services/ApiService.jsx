import axios from 'axios';
import {NOMINATIM_URL, API_BASE_URL} from '@env';

class ApiService {
  static async getAddressFromCurrentLocation(lat, lon) {
    try {
      //https://api.opencagedata.com/geocode/v1/json?q=39.887215+32.82580166666666&key=64b315a81f6a463f9e9662626ff9d901
      //https://nominatim.openstreetmap.org/reverse?lat=39.887215&lon=32.82580166666666&format=json
      const apiUrl = `${NOMINATIM_URL}/reverse.php?lat=${lat}&lon=${lon}&format=json`;
      const response = await axios.get(apiUrl);
      return response;
      // Adres verilerini kullanmak için burada işlemler yapabilirsiniz
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  }

  /*
  static async getPosts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async getUser(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  */
}

export default ApiService;
