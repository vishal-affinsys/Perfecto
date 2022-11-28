import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import LocalStorage, {Operations} from '../API/LocalStorage';
import fontStyle from '../helpers/Font';
import Icon from '../helpers/Icons';
import Theme from '../helpers/Theme';
// import Divider from '../components/Divider';

const FavoriteScreen = () => {
  const width = useWindowDimensions().width;
  const [photos, setPhotos] = useState([]);
  const [video, setVideos] = useState([]);
  useEffect(() => {
    async function getData() {
      let data = await LocalStorage.getDatafromLocal(Operations.photo);
      setPhotos(data);
      console.log(data);
    }
    getData();
  }, [setPhotos]);

  return (
    <View style={{...Theme.body}}>
      <Text style={fontStyle.h1}>Your</Text>
      <Text style={{...fontStyle.h1, ...style.favorite}}>Favorites</Text>
      <View style={style.headerContainer}>
        <Text style={{...fontStyle.h2, ...style.wallpaper}}>Wallpapers</Text>
        <Image source={Icon.wallpaper} style={style.imageIcon} />
      </View>
      <FlatList
        style={style.listStyle}
        // pagingEnabled={true}
        data={photos}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ListEmptyComponent={() => {
          return (
            <View style={{...style.placeHolderContainer, width: width - 8}}>
              <Image
                source={require('../assets/images/dog.png')}
                style={style.imagePlaceholder}
                resizeMode="contain"
              />
              <Text style={{...fontStyle.h6, ...style.favoritePlaceholder}}>
                Add images to favorites
              </Text>
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{...style.imageContainer}}>
              <Image
                resizeMode="contain"
                source={{uri: item.src.large2x}}
                style={{...style.imageStyle, width: width - 60}}
              />
            </View>
          );
        }}
      />
      <View style={style.headerContainer}>
        <Text style={{...fontStyle.h2, ...style.videos}}>Video</Text>
        <Image source={Icon.video} style={style.imageIcon} />
      </View>
      <FlatList
        style={style.listStyle}
        // pagingEnabled={true}
        data={video}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ListEmptyComponent={() => {
          return (
            <View style={{...style.placeHolderContainer, width: width - 8}}>
              <Image
                source={require('../assets/images/videoPlaceholder.png')}
                style={style.imagePlaceholder}
                resizeMode="contain"
              />
              <Text style={{...fontStyle.h6, ...style.favoritePlaceholder}}>
                Add videos to favorites
              </Text>
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{...style.imageContainer}}>
              <Image
                resizeMode="contain"
                source={{uri: item.src.large2x}}
                style={{...style.imageStyle, width: width - 60}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  favorite: {
    color: 'rgba(240,90,140,1)',
  },
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
  headerContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videos: {
    color: 'rgba(190,120,55,1)',
    marginHorizontal: 4,
    marginVertical: 12,
  },
  imageStyle: {
    height: 230,
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
