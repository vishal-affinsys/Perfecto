import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Divider = () => {
  const Theme = useTheme();
  return <View style={{...style.divider, borderColor: Theme.colors.border}} />;
};

const style = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
});

export default Divider;
