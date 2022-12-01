import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import fontStyle from '../helpers/Font';
import {useNavigation, useTheme} from '@react-navigation/native';
import theme from '../helpers/Theme';
import CustomList from '../components/CustomList';
import IconButton from '../components/IconButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  getPhotoQuality,
  getVideoQuality,
  getPaginatedImages,
  getTheme,
} from '../Store/Reducers';
const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const images = useSelector(state => state.image);

  useEffect(() => {
    dispatch(getPaginatedImages(page));
    dispatch(getPhotoQuality());
    dispatch(getVideoQuality());
    dispatch(getTheme());
  }, [dispatch, page]);

  const Theme = useTheme();

  return (
    <View style={theme.body}>
      <StatusBar
        backgroundColor={Theme.colors.border}
        animated={true}
        barStyle={Theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={style.header}>
        <View>
          <Text style={Theme.fonts.h1}>Trending</Text>
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
          icon={'search'}
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
    overflow: 'hidden',
    borderRadius: 40,
    marginRight: 12,
  },

  searchPressable: {
    padding: 8,
  },
});

export default HomeScreen;
