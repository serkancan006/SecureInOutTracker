/* eslint-disable react/react-in-jsx-scope */
// App.jsx
// Navigasyon
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Sayfalar
import Register from './src/screens/Register';
import Home from './src/screens/Home';
// useContext
import AuthProvider, {useAuth} from './AuthContext';
//componenet
import DavetLogo from './src/components/DavetLogo';
import OlimposLogo from './src/components/OlimposLogo';

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
  const [user] = useAuth();
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
        name="Home"
        component={Home}
        options={{
          headerTitle: 'OlimposMobile',
        }}
      />
    </Stack.Navigator>
  );
};

// Ana uygulama yönlendirme işlevi
const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
