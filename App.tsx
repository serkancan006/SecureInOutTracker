/* eslint-disable react/react-in-jsx-scope */
// App.jsx
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './AuthContext';
import Navigator from './Navigator';

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
