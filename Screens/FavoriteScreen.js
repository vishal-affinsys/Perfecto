import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import Icon from '../helpers/Icons';
import theme from '../helpers/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {getPhotosFromLocal, getVideosFromLocal} from '../Store/Reducers';
import {useNavigation, useTheme} from '@react-navigation/native';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storage = useSelector(state => state.storage);
  const Theme = useTheme();
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    dispatch(getPhotosFromLocal());
    dispatch(getVideosFromLocal());
  }, [dispatch]);

  return (
    <View style={{...theme.body}}>
      <Text style={Theme.fonts.h1}>Your</Text>
      <Text style={Theme.fonts.favoriteHeader}>Favorites</Text>
      <View style={style.bodyContainer}>
        <View>
          <View style={style.headerContainer}>
            <Text style={Theme.fonts.wallpaperHeader}>Wallpapers</Text>
            <Image source={Icon.navIcons.wallpaper} style={style.imageIcon} />
          </View>
          <FlatList
            style={style.listStyle}
            // pagingEnabled={true}
            data={storage.photos}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            ListEmptyComponent={() => {
              return (
                <View style={{...style.placeHolderContainer, width: width - 8}}>
                  <Image
                    source={require('../assets/images/dog.png')}
                    style={{
                      ...style.imageStyle,
                      width: width - 60,
                      height: Math.max(height / 2 - 200, 200),
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{...Theme.fonts.h6, ...style.favoritePlaceholder}}>
                    Add images to favorites
                  </Text>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              console.log(item);
              return (
                <Pressable
                  onPress={() => {
                    let original = [];
                    let large2x = [];
                    let src = [];
                    let images = storage.photos;
                    for (let i = 0; i < images.length; i++) {
                      original.push({
                        url: images[i].src.original,
                        id: images[i].id,
                      });
                      large2x.push({
                        url: images[i].src.large2x,
                        id: images[i].id,
                      });
                      src.push(images[i].srcArray);
                    }
                    let params = {
                      original: original,
                      large2x: large2x,
                      index: index,
                      src: src,
                    };
                    navigation.navigate('wallpaperView', params);
                  }}>
                  <View style={{...style.imageContainer}}>
                    <Image
                      // resizeMode="none"
                      source={{uri: item.src.large2x}}
                      style={{
                        ...style.imageStyle,
                        width: width - 60,
                        height: Math.max(height / 2 - 200, 200),
                      }}
                    />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
        <View>
          <View style={style.headerContainer}>
            <Text style={Theme.fonts.videoHeader}>Video</Text>
            <Image source={Icon.navIcons.video} style={style.imageIcon} />
          </View>
          <FlatList
            style={style.listStyle}
            // pagingEnabled={true}
            data={storage.videos}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            ListEmptyComponent={() => {
              return (
                <View style={{...style.placeHolderContainer, width: width - 8}}>
                  <Image
                    source={require('../assets/images/videoPlaceholder.png')}
                    style={{
                      ...style.imageStyle,
                      width: width - 60,
                      height: Math.max(height / 2 - 200, 200),
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{...Theme.fonts.h6, ...style.favoritePlaceholder}}>
                    Add videos to favorites
                  </Text>
                </View>
              );
            }}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('videoScreen', item);
                  }}>
                  <View style={{...style.imageContainer}}>
                    <Image
                      resizeMode="stretch"
                      source={{uri: item.thumbnail}}
                      style={{
                        ...style.imageStyle,
                        width: width - 60,
                        height: Math.max(height / 2 - 200, 200),
                      }}
                    />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  favoritePlaceholder: {
    textAlign: 'center',
  },
  wallpaper: {
    marginHorizontal: 4,
    marginVertical: 12,
    color: 'rgba(100,83,190,1)',
  },
  imageIcon: {
    height: 50,
    width: 50,
  },
  bodyContainer: {
    flex: 1,
    marginVertical: 8,
    // backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videos: {
    color: 'rgba(190,120,55,1)',
    marginHorizontal: 4,
    marginVertical: 12,
  },
  imageStyle: {
    borderRadius: 12,
  },
  imageContainer: {
    padding: 8,
  },
  listStyle: {
    // height: 290,
    flexGrow: 0,
  },
  placeHolderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    height: 240,
    width: '100%',
    alignSelf: 'center',
  },
});

export default FavoriteScreen;
