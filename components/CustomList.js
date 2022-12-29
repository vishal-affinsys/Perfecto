import {
  FlatList,
  Text,
  Image,
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import fontStyle from '../helpers/Font';
import {useSelector} from 'react-redux';

const CustomList = ({images, setPage, horizontal}) => {
  const navigation = useNavigation();
  const imagesRdx = useSelector(state => state.image);
  const {width, height} = useWindowDimensions();
  const Theme = useTheme();

  return (
    <FlatList
      style={style.listStyle}
      horizontal={horizontal}
      contentContainerStyle={style.listGrow}
      data={images}
      keyExtractor={(item, index) => {
        return index;
      }}
      ListEmptyComponent={() => {
        if (imagesRdx.loading) {
          return (
            <View style={style.activityContainer}>
              <ActivityIndicator style={style.activityIndicator} />
            </View>
          );
        } else if (imagesRdx.status === 'failed') {
          return (
            <View style={style.activityContainer}>
              <Text style={{...fontStyle.h5, ...style.error}}>
                {imagesRdx.error}
              </Text>
            </View>
          );
        }
      }}
      ListFooterComponent={() => {
        return images.length === 0 ? (
          <View />
        ) : (
          <View
            style={{
              ...style.loadContainer,
              backgroundColor: Theme.colors.card,
            }}>
            <Pressable
              style={style.pressableComponent}
              android_ripple={{color: Theme.colors.rippleColor}}
              onPress={() => {
                setPage(previous => previous + 1);
              }}>
              <Text style={{...style.footerText, color: Theme.fonts.h6.color}}>
                Load more
              </Text>
            </Pressable>
          </View>
        );
      }}
      renderItem={({item, index}) => {
        return (
          <View style={style.imageButton}>
            <Pressable
              onPress={() => {
                let original = [];
                let large2x = [];
                let src = [];
                for (let i = 0; i < images.length; i++) {
                  original.push({
                    url: images[i].src.original,
                    id: images[i].id,
                  });
                  large2x.push({url: images[i].src.large2x, id: images[i].id});
                  src.push({
                    src: images[i].src,
                    id: images[i].id,
                  });
                }
                let params = {
                  original: original,
                  large2x: large2x,
                  index: index,
                  src: src,
                };
                navigation.navigate('wallpaperView', params);
              }}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                source={{uri: item.src.large2x, cache: 'force-cache'}}
                style={{
                  height: Math.max(height / 2 - 100, 200),
                  borderRadius: width / 18,
                }}
              />
            </Pressable>
          </View>
        );
      }}
    />
  );
};

const style = StyleSheet.create({
  error: {
    color: 'rgba(240,160,150,1)',
    textAlign: 'center',
  },
  listStyle: {
    flex: 1,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listGrow: {
    flexGrow: 1,
  },
  loadContainer: {
    marginRight: 20,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  pressableComponent: {
    padding: 8,
  },
  imageStyle: {
    // height: 300,
    borderRadius: 12,
  },
  footerText: {
    color: 'rgba(200,200,245,1)',
    textAlign: 'right',
    fontSize: 20,
  },
  imageButton: {
    overflow: 'hidden',
    margin: 10,
  },
});

export default CustomList;
