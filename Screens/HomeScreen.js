import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import fontStyle from '../helpers/Font';
import {useNavigation} from '@react-navigation/native';
import Theme from '../helpers/Theme';
import Icon from '../helpers/Icons';
import CustomList from '../components/CustomList';
import IconButton from '../components/IconButton';
import {useSelector, useDispatch} from 'react-redux';
import {getPaginatedImages} from '../Store/Images';
import {getPhotoQuality, getVideoQuality} from '../Store/Settings';
import ScrapeImages from '../helpers/ScrapeModule';

const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const images = useSelector(state => state.image);

  useEffect(() => {
    dispatch(getPaginatedImages(page));
    dispatch(getPhotoQuality());
    dispatch(getVideoQuality());
  }, [dispatch, page]);

  return (
    <View style={Theme.body}>
      <StatusBar backgroundColor={'rgba(25,25,25,0.9)'} animated={true} />
      <View style={style.header}>
        <View>
          <Text style={{...fontStyle.h1, ...Theme.headingStyle}}>Trending</Text>
          <Text
            style={{
              ...fontStyle.h1,
              ...Theme.headingStyle,
              ...style.wallpaper,
            }}>
            wallpapers
          </Text>
        </View>
        <IconButton
          styleContainer={style.searchContainer}
          styleImage={style.searchIcon}
          onPress={() => {
            navigation.navigate('searchScreen');
          }}
          icon={Icon.search}
        />
      </View>
      <CustomList images={images.images} setPage={setPage} />
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  wallpaper: {
    color: 'rgba(100,83,190,1)',
  },

  searchIcon: {
    height: 50,
    width: 50,
  },

  searchContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
    overflow: 'hidden',
    borderRadius: 40,
    marginRight: 12,
  },

  searchPressable: {
    padding: 8,
  },
});

export default HomeScreen;
