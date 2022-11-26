import React, {useState, useRef} from 'react';
import {View, StyleSheet, ToastAndroid, Pressable, Image} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import fontStyle from '../helpers/Font';
import Theme from '../helpers/Theme';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';
import APIController from '../API/APIControllers';
import SetWallpaperModule from '../helpers/SetWallpaper';
import {Picker} from '@react-native-picker/picker';
import Icon from '../helpers/Icons';

const WallpaperView = ({route}) => {
  const large2x = route.params.large2x;
  const original = route.params.original;
  const [index, setIndex] = useState(route.params.index);
  const [selectedValue, setSelectedValue] = useState(null);

  async function downloadImage() {
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
    console.log(original[index].url);
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
          '.jpeg',
        description: 'Image',
      },
    };

    APIController.logger(options);
    console.log(index);

    config(options)
      .fetch('GET', original[index].url)
      .then(res => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
      });
  }

  async function threeDotsFunctions(itemValue, itemIndex) {
    setSelectedValue(itemValue);
    if (itemValue === 'download') {
      await downloadImage();
      ToastAndroid.showWithGravityAndOffset(
        'Downloading Image',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (itemValue === 'set') {
      await SetWallpaperModule.setWallpaper(original[index].url, (res, msg) => {
        console.log(res, msg);
      });
    } else if (itemValue === 'preview') {
      console.log(itemIndex, itemValue);
    }
  }

  const pickerRef = useRef();

  return (
    <View style={{...Theme.body, ...style.body}}>
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
              <Picker.Item label="Set as wallaper" value="set" />
              <Picker.Item label="Preview wallpaper" value="preview" />
            </Picker>
          </Pressable>
        </View>
      </View>
      <ImageViewer
        saveToLocalByLongPress={true}
        style={style.imageStyle}
        backgroundColor={'rgba(25,25,25,1)'}
        imageUrls={large2x}
        index={index}
        pageAnimateTime={100}
        onChange={i => {
          setIndex(i);
        }}
        enablePreload={true}
      />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 350,
    width: '100%',
  },
  downloadButton: {
    textAlign: 'right',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 10,
  },
  threeDots: {
    height: 40,
    width: 40,
  },
  buttonContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
    overflow: 'hidden',
    borderRadius: 40,
  },
  pressableStyle: {
    padding: 8,
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
  options: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgba(240,240,240,1)',
    backgroundColor: 'rgba(40,40,40,1)',
  },
});

export default WallpaperView;
