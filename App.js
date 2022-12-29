import React from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabIcons from './components/BottomTabIcons';
import Icon from './helpers/Icons';
import {Provider, useSelector} from 'react-redux';
import {store} from './Store/Store';
import {useColorScheme} from 'react-native';
import {
  AccountScreen,
  ExploreScreen,
  FavoriteScreen,
  HomeScreen,
  LogScreen,
  PreviewScreen,
  SearchScreen,
  SearchVideo,
  VideoScreen,
  WallpaperView,
} from './Screens';
import {CustomDarkTheme, CustomLightTheme} from './helpers/ThemeData';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabScreen = () => {
  // console.log(DarkTheme);
  const Theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: Theme.colors.background,
        tabBarLabelStyle: {color: 'white'},
        tabBarAllowFontScaling: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.navIcons.wallpaper} />;
          },
          tabBarLabel: 'Wallpaper',
          tabBarLabelStyle: {
            color: 'rgba(100,83,190,1)',
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.navIcons.video} />;
          },
          tabBarLabel: 'Video',
          tabBarLabelStyle: {
            color: 'rgba(190,120,55,1)',
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.navIcons.favoriteColor} />;
          },
          tabBarLabel: 'Favorite',
          tabBarLabelStyle: {
            color: 'rgba(240,90,140,1)',
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <BottomTabIcons image={Icon.navIcons.account} />;
          },
          tabBarLabel: 'Account',
          tabBarLabelStyle: {
            color: 'rgba(143,161,73,1)',
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ReduxApp = () => {
  const colors = useColorScheme();
  const ThemeRdx = useSelector(state => state.theme);
  return (
    <Provider store={store}>
      <NavigationContainer
        theme={
          ThemeRdx.themeData
            ? ThemeRdx.themeData
            : colors === 'dark'
            ? CustomDarkTheme
            : CustomLightTheme
        }>
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
          <Stack.Screen
            name="logScreen"
            component={LogScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const App = () => (
  <Provider store={store}>
    <ReduxApp />
  </Provider>
);

export default App;
