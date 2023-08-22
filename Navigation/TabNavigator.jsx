import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Sayfalar
import Home from '../src/screens/Home';
import ShareLocation from '../src/screens/ShareLocation';
import UserInfo from '../src/screens/UserInfo';
//iconlar
import Icon from 'react-native-vector-icons/FontAwesome';
//colorlar
import colors from '../styles/color';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'UserInfo') {
            iconName = 'user';
          } else if (route.name === 'ShareLocation') {
            iconName = 'location-arrow';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, // Aktif sekmenin rengi
        tabBarInactiveTintColor: colors.gray, // Pasif sekmenin rengi
        tabBarLabelStyle: {fontSize: 12}, // Etiket stilini özelleştirme
        tabBarStyle: {height: 60, backgroundColor: colors.headerbackground}, // TabBar yüksekliği
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ShareLocation" component={ShareLocation} />
      <Tab.Screen name="UserInfo" component={UserInfo} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
