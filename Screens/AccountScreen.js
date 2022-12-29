import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fontStyle from '../helpers/Font';
import theme from '../helpers/Theme';
import Divider from '../components/Divider';
import ListTile from '../components/ListTile';
import {imageQuality, selectedTheme, videoQuality} from '../helpers/Quality';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeVideoQuality,
  changePhotoQuality,
  getPhotoQuality,
  getVideoQuality,
  setTheme,
} from '../Store/Reducers';
import {useTheme, useNavigation} from '@react-navigation/native';
import Icon from '../components/Icon';

const AccountScreen = () => {
  const username = 'Vishal';
  const tileName = 'Download/Watch\nVideo Quality';
  const [count, setCount] = useState(5);
  const navigator = useNavigation();

  useEffect(() => {
    dispatch(getPhotoQuality());
    dispatch(getVideoQuality());
  }, [dispatch]);

  const settings = useSelector(state => state.setting);
  const ThemeRdx = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const Theme = useTheme();
  return (
    <View style={theme.body}>
      <View style={style.container}>
        <Icon icon={'accountScreen'} style={style.imageStyle} />
        <View style={style.greetings}>
          <Text style={Theme.fonts.h3}>Hi, </Text>
          <Text style={{...fontStyle.h3, ...style.nameStyle}}>{username}</Text>
        </View>
      </View>
      <Divider />
      <View style={style.settingsContainer}>
        <Icon icon={'settings'} style={style.settingsImage} />
        <Pressable
          onPress={() => {
            setCount(previous => previous - 1);
            if (count === 1) {
              setCount(5);
              navigator.navigate('logScreen');
            }
            console.log(count);
          }}>
          <Text style={{...Theme.fonts.h3, ...style.settings}}>Settings</Text>
        </Pressable>
      </View>
      <ListTile
        headerLabel={tileName}
        label={'pixels'}
        options={videoQuality}
        value={'quality'}
        icon={'videoQuality'}
        selectedQuality={settings.videoQuality.pixels}
        setSelectedQuality={item => {
          dispatch(changeVideoQuality(item));
        }}
      />
      <ListTile
        headerLabel={'Download Image Quality'}
        label={'size'}
        options={imageQuality}
        selectedQuality={settings.imageQuality.size}
        setSelectedQuality={item => {
          dispatch(changePhotoQuality(item));
        }}
        icon={'download'}
      />
      <ListTile
        headerLabel={'Theme'}
        label={'theme'}
        options={selectedTheme}
        selectedQuality={ThemeRdx.selectedTheme.theme}
        setSelectedQuality={item => {
          dispatch(setTheme(item));
        }}
        icon={'theme'}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greetings: {
    flexDirection: 'row',
  },
  nameStyle: {
    color: 'rgba(143,161,73,1)',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginVertical: 20,
  },
  settingsContainer: {
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  settings: {
    marginBottom: 20,
  },
  settingsImage: {
    height: 40,
    width: 40,
    marginRight: 12,
  },
});

export default AccountScreen;
