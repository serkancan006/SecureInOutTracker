/* eslint-disable react/react-in-jsx-scope */
// App.jsx
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './AuthContext';
import RootNavigator from './RootNavigator';

// Ana uygulama yönlendirme işlevi
const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
