import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import fontStyle from '../helpers/Font';
import Theme from '../helpers/Theme';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';
import APIController from '../API/APIControllers';
import SetWallpaperModule from '../helpers/SetWallpaper';

const WallpaperView = ({route}) => {
  const large2x = route.params.large2x;
  const original = route.params.original;
  const [index, setIndex] = useState(route.params.index);

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

  return (
    <View style={{...Theme.body, ...style.body}}>
      <View style={style.optionsContainer}>
        <Pressable
          android_ripple={{color: 'white'}}
          onPress={async () => {
            await downloadImage();
          }}>
          <Text style={{...fontStyle.h5, ...style.downloadButton}}>
            Download
          </Text>
        </Pressable>
        <Pressable
          android_ripple={{color: 'white'}}
          onPress={async () => {
            await SetWallpaperModule.setWallpaper(
              original[index].url,
              (res, msg) => {
                console.log(res, msg);
              },
            );
          }}>
          <Text style={{...fontStyle.h5, ...style.downloadButton}}>
            Set as Wallpaper
          </Text>
        </Pressable>
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
  },
});

export default WallpaperView;
