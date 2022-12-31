import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Animated} from 'react-native';
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
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const MAX_HEADER_HEIGHT = 180;
  const translateTrending = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT * 5],
    outputRange: [0, -MAX_HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const opacityTrending = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const searchScale = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={theme.body}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Animated.View
        style={[
          style.header,
          {opacity: opacityTrending},
          {transform: [{translateY: translateTrending}, {scale: searchScale}]},
        ]}>
        <View>
          <Text style={[Theme.fonts.h1]}>Trending</Text>
          <Text
            style={{
              ...fontStyle.h1,
              ...Theme.headingStyle,
              ...style.wallpaper,
            }}>
            Wallpapers
          </Text>
        </View>
        <View>
          <IconButton
            styleContainer={style.searchContainer}
            styleImage={style.searchIcon}
            onPress={() => {
              navigation.navigate('searchScreen');
            }}
            icon={'search'}
          />
        </View>
      </Animated.View>
      <CustomList
        images={images.images}
        setPage={setPage}
        scrollY={scrollY}
        paddingTop={MAX_HEADER_HEIGHT}
      />
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  wallpaper: {
    color: 'rgba(100,83,190,1)',
  },
  searchIcon: {
    height: 50,
    width: 50,
  },

  scrollContainer: {
    overflow: 'hidden',
    alignSelf: 'flex-end',
    borderRadius: 40,
    position: 'absolute',
    zIndex: 1,
    bottom: 12,
    right: 3,
    marginRight: 12,
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
