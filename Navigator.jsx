import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Sayfalar
import Register from './src/screens/Register';
import Home from './src/screens/Home';
// useContext
import {useAuth} from './AuthContext';
//componenet
import DavetLogo from './src/components/DavetLogo';
import OlimposLogo from './src/components/OlimposLogo';
import ShareLocation from './src/screens/ShareLocation';
// İlgili ekran yığını oluşturuluyor
const Stack = createNativeStackNavigator();

// Navigasyon işlevi
const Navigator = () => {
  const commonScreenOptions = {
    headerTitleAlign: 'center',
    headerLeft: () => <DavetLogo />,
    headerRight: () => <OlimposLogo />,
    headerStyle: {backgroundColor: '#ECECEC'},
    headerTitleStyle: {fontSize: 22, fontWeight: '600', color: '#1A5A9B'}, //#1A5A9B -> Davet , #2A95FF ->Olimpos
  };
  // Oturum açmış kullanıcıyı al
  const {user} = useAuth();
  // Kullanıcı oturum açmışsa Ana Sayfa'ya, aksi halde Kayıt Sayfası'na yönlendir
  if (!user) {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerTitle: 'Kayıt Ol'}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen
        name="ShareLocation"
        component={ShareLocation}
        options={{
          headerTitle: 'Konum Paylaş',
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'OlimposMobile',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
