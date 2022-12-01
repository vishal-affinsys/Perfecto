import {Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Icons from '../helpers/Icons';
const Icon = ({icon, style}) => {
  const Theme = useTheme();
  return (
    <Image
      source={Theme.dark ? Icons.dark[icon] : Icons.light[icon]}
      style={style}
    />
  );
};

export default Icon;
