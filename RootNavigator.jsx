import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Sayfalar
import Register from './src/screens/Register';
import TabNavigator from './TabNavigator';
// useContext
import {useAuth} from './AuthContext';
//componenet
import DavetLogo from './src/componenets/DavetLogo';
import OlimposLogo from './src/componenets/OlimposLogo';
// İlgili ekran yığını oluşturuluyor
const Stack = createNativeStackNavigator();

// Navigasyon işlevi
const RootNavigator = () => {
  // Oturum açmış kullanıcıyı al
  const {user} = useAuth();
  // Kullanıcı oturum açmışsa Ana Sayfa'ya, aksi halde Kayıt Sayfası'na yönlendir
  if (!user) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => <DavetLogo />,
          headerRight: () => <OlimposLogo />,
          headerStyle: {backgroundColor: '#ECECEC'},
          headerTitleStyle: {fontSize: 22, fontWeight: '600', color: '#1A5A9B'}, //#1A5A9B -> Davet , #2A95FF ->Olimpos
        }}>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerTitle: 'Kayıt Ol'}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => <DavetLogo />,
        headerRight: () => <OlimposLogo />,
        headerStyle: {backgroundColor: '#ECECEC'},
        headerTitleStyle: {fontSize: 22, fontWeight: '600', color: '#1A5A9B'}, //#1A5A9B -> Davet , #2A95FF ->Olimpos
      }}>
      <Stack.Screen
        name="Anasayfalar"
        component={TabNavigator}
        options={{headerTitle: 'Olimpos QR'}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
