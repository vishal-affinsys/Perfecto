import React from 'react';
import {
  FlatList,
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fontStyle from '../helpers/Font';
import {useSelector} from 'react-redux';

const VideoList = ({videos, setPage}) => {
  const {navigate} = useNavigation();
  const size = useWindowDimensions();

  const videoRdx = useSelector(state => state.video);

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) => index}
      numColumns={3}
      ListEmptyComponent={() => {
        if (videoRdx.loading) {
          return (
            <View style={style.activityContainer}>
              <ActivityIndicator style={style.activityIndicator} />
            </View>
          );
        } else if (videoRdx.status === 'failed') {
          return (
            <View style={style.activityContainer}>
              <Text style={{...fontStyle.h5, ...style.error}}>
                {videoRdx.error}
              </Text>
            </View>
          );
        }
      }}
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
                id: item.id,
                thumbnail: item.video_pictures[0].picture,
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
