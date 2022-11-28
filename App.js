import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WallpaperView from './Screens/WallpaperView';
import SearchScreen from './Screens/SearchScreen';
import PreviewScreen from './Screens/PreviewScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from './Screens/FavoriteScreen';
import AccountScreen from './Screens/AccountScreen';
import ExploreScreen from './Screens/ExploreScreen';
import BottomTabIcons from './components/BottomTabIcons';
import Icon from './helpers/Icons';
import VideoScreen from './Screens/VideoScreen';
import SearchVideo from './Screens/SearchVideo';
// import {Provider} from 'react-redux';
// import store from './Store/Store';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: 'rgba(40,40,40,1)',
        tabBarInactiveBackgroundColor: 'rgba(25,25,25,1)',
        tabBarLabelStyle: {color: 'white'},
        tabBarAllowFontScaling: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.home} />;
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.explore} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.favorite} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.account} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="wallpaperView"
          component={WallpaperView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="searchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="previewScreen"
          component={PreviewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="videoScreen"
          component={VideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="searchVideo"
          component={SearchVideo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const ReduxApp = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

export default App;
