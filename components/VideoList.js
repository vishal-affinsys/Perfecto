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
import APIController from '../API/APIControllers';

const VideoList = ({videos, setPage}) => {
  const {navigate} = useNavigation();
  const size = useWindowDimensions();

  const videoRdx = useSelector(state => state.video);
  const settings = useSelector(state => state.setting);

  function sortVideos() {
    let videoLink = [];
    for (let i = 0; i < videos.length; i++) {
      let data = {
        FHD: {link: '', height: 0},
        HD: {link: '', height: 0},
        SD: {link: '', height: 0},
      };
      for (let j = 0; j < videos[i].video_files.length; j++) {
        if (videos[i].video_files[j].height === 1080) {
          data.FHD.link = videos[i].video_files[j].link;
          data.FHD.height = 1080;
        } else if (videos[i].video_files[j].height === 720) {
          data.HD.link = videos[i].video_files[j].link;
          data.HD.height = 720;
        } else if (
          videos[i].video_files[j].height <= 720 &&
          videos[i].video_files[j].height > data.SD.height
        ) {
          data.SD.link = videos[i].video_files[j].link;
          data.SD.height = videos[i].video_files[j].height;
        }
      }
      videoLink.push(data);
    }
    return videoLink;
  }

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
      renderItem={({item, index}) => {
        return (
          <Pressable
            onPress={() => {
              let video = sortVideos();
              APIController.logger(video[index]);
              APIController.logger(video[index][settings.videoQuality.quality]);
              navigate('videoScreen', {
                video: video[index][settings.videoQuality.quality].link,
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
