import {
  FlatList,
  Text,
  Image,
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import fontStyle from '../helpers/Font';
import {useSelector} from 'react-redux';

const CustomList = ({images, setPage, horizontal}) => {
  const navigation = useNavigation();
  const imagesRdx = useSelector(state => state.image);

  return (
    <FlatList
      style={style.listStyle}
      horizontal={horizontal}
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
          <View style={style.loadContainer}>
            <Pressable
              style={style.pressableComponent}
              android_ripple={{color: 'white'}}
              onPress={() => {
                setPage(previous => previous + 1);
              }}>
              <Text style={{...fontStyle.h6, ...style.footerText}}>
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
                source={{uri: item.src.large2x, cache: 'force-cache'}}
                style={
                  ({
                    aspectRatio: item.height / item.width,
                  },
                  style.imageStyle)
                }
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
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
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
    height: 300,
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
