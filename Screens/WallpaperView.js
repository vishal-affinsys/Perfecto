import React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Theme from '../helpers/Theme';

const WallpaperView = ({route}) => {
  const images = route.params.image;
  const index = route.params.index;

  return (
    <View style={{...Theme.body, ...style.body}}>
      <ImageViewer
        saveToLocalByLongPress={true}
        style={style.imageStyle}
        imageUrls={images}
        index={index}
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
});

export default WallpaperView;
