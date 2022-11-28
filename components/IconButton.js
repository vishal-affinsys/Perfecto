import React from 'react';
import {View, Pressable, Image, StyleSheet} from 'react-native';

const IconButton = ({icon, onPress, styleImage, styleContainer}) => {
  return (
    <View style={{...style.searchContainer, ...styleContainer}}>
      <Pressable
        onPress={() => {
          onPress();
        }}
        style={style.searchPressable}
        android_ripple={{color: 'white'}}>
        <Image style={styleImage} source={icon} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
    borderRadius: 40,
    overflow: 'hidden',
    // marginRight: 20,
  },
  searchPressable: {
    padding: 8,
  },
});

export default IconButton;
