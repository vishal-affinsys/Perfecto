import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const BottomTabIcons = ({image}) => {
  return (
    <View>
      <Image source={image} style={style.imageStyle} />
    </View>
  );
};

const style = StyleSheet.create({
  imageStyle: {
    height: 25,
    width: 25,
  },
});

export default BottomTabIcons;
