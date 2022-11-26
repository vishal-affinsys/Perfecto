import React from 'react';
import {
  FlatList,
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fontStyle from '../helpers/Font';

const VideoList = ({videos, setPage}) => {
  const {navigate} = useNavigation();
  const size = useWindowDimensions();

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) => index}
      numColumns={3}
      ListFooterComponent={() => {
        return videos.length === 0 ? (
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
      renderItem={({item}) => {
        return (
          <Pressable
            onPress={() => {
              navigate('videoScreen', {
                video: item.video_files[0].link,
              });
            }}>
            <Image
              source={{uri: item.video_pictures[0].picture}}
              style={{...style.imageStyle, width: size.width / 3 - 6}}
            />
          </Pressable>
        );
      }}
    />
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
  },
  searchPressable: {
    padding: 8,
  },
  searchIcon: {
    height: 50,
    width: 50,
  },
  imageStyle: {
    height: 200,
    margin: 2,
    borderRadius: 12,
    // width: '100%',
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
});

export default VideoList;
