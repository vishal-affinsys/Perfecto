import React from 'react';
import {Image, Dimensions, View, StatusBar} from 'react-native';

const PreviewScreen = ({route}) => {
  const imageSrc = route.params.src;
  const dimensions = Dimensions.get('screen');

  return (
    <View>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={{uri: imageSrc}}
        style={{height: dimensions.height, width: dimensions.width}}
      />
    </View>
  );
};

export default PreviewScreen;
