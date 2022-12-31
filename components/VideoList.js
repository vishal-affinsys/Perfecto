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
import {useNavigation, useTheme} from '@react-navigation/native';
import fontStyle from '../helpers/Font';
import {useSelector} from 'react-redux';
import {BaseAPIHandler} from '../API/APIControllers';

const VideoList = ({videos, setPage, styleList}) => {
  const {navigate} = useNavigation();
  const size = useWindowDimensions();

  const videoRdx = useSelector(state => state.video);
  const settings = useSelector(state => state.setting);

  const Theme = useTheme();

  function searchVideo(video_files, data) {
    for (let j = 0; j < video_files.length; j++) {
      if (video_files[j].height === 1080) {
        data.FHD.link = video_files[j].link;
        data.FHD.height = 1080;
      } else if (video_files[j].height === 720) {
        data.HD.link = video_files[j].link;
        data.HD.height = 720;
      } else if (
        video_files[j].height <= 720 &&
        video_files[j].height > data.SD.height
      ) {
        data.SD.link = video_files[j].link;
        data.SD.height = video_files[j].height;
      }
    }
  }

  function sortVideos() {
    let videoLink = [];
    for (let i = 0; i < videos.length; i++) {
      let data = {
        FHD: {link: '', height: 0},
        HD: {link: '', height: 0},
        SD: {link: '', height: 0},
      };
      searchVideo(videos[i].video_files, data);
      videoLink.push(data);
    }

    BaseAPIHandler.logger(videoLink[0]);
    return videoLink;
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) => index}
      contentContainerStyle={style.listGrow}
      numColumns={3}
      ListEmptyComponent={() => {
        if (videoRdx.loading) {
          return (
            <View style={{...style.activityContainer, ...styleList}}>
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
          <Pressable
            onPress={() => {
              let video = sortVideos();
              let link = video[index][settings.videoQuality.quality].link;
              if (link === '') {
                link = video[index].HD.link;
              }
              if (link === '') {
                link = video[index].SD.link;
              }
              BaseAPIHandler.logger(link);
              navigate('videoScreen', {
                video: link,
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
  listGrow: {
    flexGrow: 1,
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
    backgroundColor: 'white',
    // width: '100%',
  },
  loadContainer: {
    marginTop: 12,
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
