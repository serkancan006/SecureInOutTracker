import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Sayfalar
import Home from './src/screens/Home';
import ShareLocation from './src/screens/ShareLocation';
//iconlar
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            //iconName = focused ? 'house' : 'house-outline';
            iconName = 'home';
          } else if (route.name === 'UserInfo') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Aktif sekmenin rengi
        tabBarInactiveTintColor: 'gray', // Pasif sekmenin rengi
        tabBarLabelStyle: {fontSize: 12}, // Etiket stilini özelleştirme
        tabBarStyle: {height: 60, backgroundColor: '#ECECEC', display: 'none'}, // TabBar yüksekliği
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      {/* 
      <Tab.Screen name="ShareLocation" component={ShareLocation} />
      */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
