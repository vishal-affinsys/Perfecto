import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  Pressable,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import Theme from '../helpers/Theme';
import Orientation from 'react-native-orientation-locker';
import {Picker} from '@react-native-picker/picker';
import Icon from '../helpers/Icons';
import RNFetchBlob from 'rn-fetch-blob';
import APIController from '../API/APIControllers';
import {useDispatch, useSelector} from 'react-redux';
import {removeVideoFromLocal, saveVideosToLocal} from '../Store/Storage';

const VideoScreen = ({route}) => {
  const video = route.params.video;
  const pickerRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = useState();
  const [selectedSize, setSelectedSize] = useState(0);
  const [orientation, setOrientation] = useState('Portrait');

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
        console.log('Storage Permission Granted.');
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
    console.log(video);
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;

    APIController.logger(PictureDir);

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

    APIController.logger(options);

    config(options)
      .fetch('GET', video)
      .then(res => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
      });
  }

  async function threeDotsFunctions(func) {
    if (func === 'download') {
      await downloadVideo();
      ToastAndroid.showWithGravityAndOffset(
        'Downloading Image',
        0.2,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (func === 'resize') {
      setSelectedSize(previous => (previous + 1) % 4);
      console.log(selectedSize);
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
    <View style={Theme.body}>
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
          console.log(data);
        }}
        onBuffer={data => {
          console.log(data);
        }}
      />
      <View style={style.optionsContainer}>
        <View style={style.buttonContainer}>
          <Pressable
            style={style.pressableStyle}
            onPress={() => {
              pickerRef.current.focus();
            }}
            android_ripple={{color: 'white'}}>
            <Image style={style.threeDots} source={Icon.threeDots} />
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
  },
  picker: {
    color: 'white',
    height: 40,
    flex: 1,
    backgroundColor: 'white',
    width: 40,
    padding: 8,
    marginRight: 12,
    display: 'none',
  },
});

export default VideoScreen;
