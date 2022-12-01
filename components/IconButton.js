import React from 'react';
import {View, Pressable, Image, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from '../helpers/Icons';

const IconButton = ({icon, onPress, styleImage, styleContainer}) => {
  const theme = useTheme();
  return (
    <View style={{backgroundColor: theme.colors.card, ...styleContainer}}>
      <Pressable
        onPress={() => {
          onPress();
        }}
        style={style.searchPressable}
        android_ripple={{color: theme.colors.rippleColor}}>
        <Image
          style={styleImage}
          source={theme.dark ? Icon.dark[icon] : Icon.light[icon]}
        />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    // marginRight: 20,
  },
  searchPressable: {
    padding: 8,
  },
});

export default IconButton;
