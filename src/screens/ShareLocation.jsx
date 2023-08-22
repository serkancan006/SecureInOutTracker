import {ScrollView} from 'react-native';
import React from 'react';
//custom state
//stiller
import Pagestyles from '../../styles/Pagestyles';
//componenet
import ShareLocationComponent from '../components/ShareLocationComponent';
import AdressComponent from '../components/AdressComponent';
//custom hook
import useLocationAddress from '../CustomHook/useLocationAddress'; // Özel kancayı içe aktarın

const ShareLocation = () => {
  const [location, address, refreshLocation, locationError] =
    useLocationAddress();

  return (
    <ScrollView contentContainerStyle={Pagestyles.container}>
      <ShareLocationComponent location={location} address={address} />
      <AdressComponent
        address={address}
        refreshLocation={refreshLocation}
        locationError={locationError}
      />
    </ScrollView>
  );
};

export default ShareLocation;
