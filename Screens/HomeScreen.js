import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import fontStyle from '../helpers/Font';
import APIController, {Endpoints} from '../API/APIControllers';
import {useNavigation} from '@react-navigation/native';
import Theme from '../helpers/Theme';

const HomeScreen = () => {
  const [image, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      let data = await APIController.getData(Endpoints.paginatedData(page));
      setImages(previous => [...previous, ...data.photos]);
    }
    getData();
  }, [setImages, page]);

  return (
    <View style={Theme.body}>
      <StatusBar backgroundColor={'rgba(25,25,25,0.9)'} animated={true} />
      <Text style={{...fontStyle.h1, ...Theme.headingStyle}}>
        Trending wallpapers
      </Text>
      <FlatList
        data={image}
        keyExtractor={(item, index) => {
          return index;
        }}
        ListFooterComponent={() => {
          return (
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
          // console.log(item);
          return (
            <View style={style.imageButton}>
              <Pressable
                onPress={() => {
                  let original = [];
                  let large2x = [];
                  for (let i = 0; i < image.length; i++) {
                    original.push({url: image[i].src.original});
                    large2x.push({url: image[i].src.large2x});
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
    </View>
  );
};

const style = StyleSheet.create({
  imageStyle: {
    height: 300,
    borderRadius: 12,
  },

  footerText: {
    color: 'rgba(200,200,245,1)',
    textAlign: 'right',
    fontSize: 20,
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
  imageButton: {
    overflow: 'hidden',
    margin: 10,
  },
});

export default HomeScreen;
