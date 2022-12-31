import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import theme from '../helpers/Theme';
import Orientation from 'react-native-orientation-locker';
import {Picker} from '@react-native-picker/picker';
import Icon from '../components/Icon';
import RNFetchBlob from 'rn-fetch-blob';
import {BaseAPIHandler} from '../API/APIControllers';
import {useDispatch, useSelector} from 'react-redux';
import {removeVideoFromLocal, saveVideosToLocal} from '../Store/Reducers';
import {useTheme} from '@react-navigation/native';

const VideoScreen = ({route}) => {
  const video = route.params.video;
  const pickerRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = useState();
  const [selectedSize, setSelectedSize] = useState(0);
  const [orientation, setOrientation] = useState('Portrait');

  const Theme = useTheme();

  const dispatch = useDispatch();
  const storage = useSelector(state => state.storage);

  const mode = ['stretch', 'contain', 'cover', 'none'];

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);
  BackHandler.addEventListener('hardwareBackPress', () => {
    Orientation.lockToPortrait();
  });

  async function downloadVideo() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        BaseAPIHandler.logger('Storage Permission Granted.');
      } else {
      }
    } catch (err) {
      BaseAPIHandler.logger(err);
    }
    BaseAPIHandler.logger('VIDEO:' + JSON.stringify(video));
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;

    BaseAPIHandler.logger('Picture_dir:' + PictureDir);

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/perfecto_' +
          Math.floor(new Date().getTime() + new Date().getSeconds() / 2) +
          '.mp4',
        description: 'Video',
      },
    };

    BaseAPIHandler.logger('Download Options:' + JSON.stringify(options));

    config(options)
      .fetch('GET', video)
      .then(res => {
        //Showing alert after successful downloading
        BaseAPIHandler.logger('res -> ' + JSON.stringify(res));
      });
  }

  async function threeDotsFunctions(func) {
    if (func === 'download') {
      await downloadVideo();
      ToastAndroid.showWithGravityAndOffset(
        'Downloading Video',
        0.2,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (func === 'resize') {
      setSelectedSize(previous => (previous + 1) % 4);
      BaseAPIHandler.logger('Selected Size:' + JSON.stringify(selectedSize));
      ToastAndroid.showWithGravityAndOffset(
        mode[selectedSize],
        0.2,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (func === 'Portrait') {
      Orientation.lockToPortrait();
      setOrientation('Landscape');
    } else if (func === 'Landscape') {
      Orientation.lockToLandscape();
      setOrientation('Portrait');
    } else if (func === 'favorite') {
      dispatch(saveVideosToLocal(route.params));
      ToastAndroid.showWithGravityAndOffset(
        'Added to favorite',
        0.2,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (func === 'remove_favorite') {
      ToastAndroid.showWithGravityAndOffset(
        'Removed from favorite',
        0.2,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      dispatch(removeVideoFromLocal(route.params.id));
    }
  }

  function checkIfExist(itemId) {
    for (let i = 0; i < storage.videos.length; i++) {
      if (storage.videos[i].id === itemId) {
        return true;
      }
    }
    return false;
  }

  return (
    <View style={{...theme.body, ...style.body}}>
      {/* <StatusBar translucent /> */}
      <Video
        controls={true}
        style={style.videoStyle}
        source={{uri: video}}
        fullscreen={true}
        hideShutterView={true}
        isTVSelectable={true}
        muted={false}
        resizeMode={mode[selectedSize]}
        volume={10}
        onLoad={data => {
          BaseAPIHandler.logger('On load data->' + JSON.stringify(data));
        }}
        onBuffer={data => {
          BaseAPIHandler.logger('On Buffer data->' + JSON.stringify(data));
        }}
      />
      <View style={style.optionsContainer}>
        <View
          style={{
            ...style.buttonContainer,
            backgroundColor: Theme.colors.card,
          }}>
          <Pressable
            style={style.pressableStyle}
            onPress={() => {
              pickerRef.current.focus();
            }}
            android_ripple={{color: Theme}}>
            <Icon icon={'threeDots'} style={style.threeDots} />
            <Picker
              ref={pickerRef}
              selectedValue={selectedValue}
              style={style.picker}
              onValueChange={async (itemValue, itemIndex) => {
                await threeDotsFunctions(itemValue, itemIndex);
              }}
              mode="dropdown">
              <Picker.Item label="Options" style={style.options} />
              <Picker.Item label="Download" value={'download'} />
              <Picker.Item label="Resize" value="resize" />
              <Picker.Item
                label={
                  checkIfExist(route.params.id)
                    ? 'Remove from favorite'
                    : 'Add to favorite'
                }
                value={
                  checkIfExist(route.params.id) ? 'remove_favorite' : 'favorite'
                }
              />
              <Picker.Item label={orientation} value={orientation} />
            </Picker>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  videoStyle: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  body: {
    padding: 0,
  },
  text: {
    height: 100,
    width: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  threeDots: {
    height: 20,
    width: 20,
  },
  pressableStyle: {
    padding: 8,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 10,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 40,
    marginRight: 12,
  },
  picker: {
    height: 40,
    flex: 1,
    width: 40,
    padding: 8,
    marginRight: 12,
    display: 'none',
  },
});

export default VideoScreen;
