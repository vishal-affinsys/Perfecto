import {View, StyleSheet} from 'react-native';
import React from 'react';

const Divider = () => {
  return <View style={style.divider} />;
};

const style = StyleSheet.create({
  divider: {
    borderBottomColor: 'rgba(200,200,200,1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
});

export default Divider;
