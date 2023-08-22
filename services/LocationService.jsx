import Geolocation from '@react-native-community/geolocation';

class LocationService {
  static currentLocation = null; // Başlangıçta null olarak tanımlanmış bir değişken

  static async getLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        position => {
          LocationService.currentLocation = position; // En son alınan konumu güncelle
          resolve(position);
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        },
      );
    });
  }

  // En son alınan konumu döndüren fonksiyon
  static getLastKnownLocation() {
    return LocationService.currentLocation;
  }
}

export default LocationService;
