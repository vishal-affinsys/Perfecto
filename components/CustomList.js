import {FlatList, Text, Image, View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import fontStyle from '../helpers/Font';

const CustomList = ({images, setPage}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => {
        return index;
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
                for (let i = 0; i < images.length; i++) {
                  original.push({url: images[i].src.original});
                  large2x.push({url: images[i].src.large2x});
                }
                let params = {
                  original: original,
                  large2x: large2x,
                  index: index,
                };
                navigation.navigate('wallpaperView', params);
              }}>
              <Image
                source={{uri: item.src.large, cache: 'force-cache'}}
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
