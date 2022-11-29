import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import fontStyle from '../helpers/Font';
import Theme from '../helpers/Theme';
import Divider from '../components/Divider';
import ListTile from '../components/ListTile';
import {imageQuality, videoQuality} from '../helpers/Quality';
import Icon from '../helpers/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeVideoQuality,
  changePhotoQuality,
  getPhotoQuality,
  getVideoQuality,
} from '../Store/Settings';

const AccountScreen = () => {
  const username = 'Vishal';
  const tileName = 'Download/Watch\nVideo Quality';

  useEffect(() => {
    dispatch(getPhotoQuality());
    dispatch(getVideoQuality());
  }, [dispatch]);

  const settings = useSelector(state => state.setting);
  const dispatch = useDispatch();
  return (
    <View style={Theme.body}>
      <View style={style.container}>
        <Image
          style={style.imageStyle}
          source={require('../assets/images/accountScreen.png')}
        />
        <View style={style.greetings}>
          <Text style={fontStyle.h3}>Hi, </Text>
          <Text style={{...fontStyle.h3, ...style.nameStyle}}>{username}</Text>
        </View>
      </View>
      <Divider />
      <View style={style.settingsContainer}>
        <Image
          source={require('../assets/images/settings.png')}
          style={style.settingsImage}
        />
        <Text style={{...fontStyle.h3, ...style.settings}}>Settings</Text>
      </View>
      <ListTile
        headerLabel={tileName}
        label={'pixels'}
        options={videoQuality}
        value={'quality'}
        icon={Icon.videoQuality}
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
        icon={Icon.download}
        // value={'quality'}
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
