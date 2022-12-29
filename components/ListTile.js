import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from '../components/Icon';
import {Dropdown} from 'react-native-element-dropdown';
import fontStyle from '../helpers/Font';
import {useTheme} from '@react-navigation/native';

const ListTile = ({
  options,
  headerLabel,
  label,
  value,
  icon,
  selectedQuality,
  setSelectedQuality,
}) => {
  const Theme = useTheme();
  return (
    <View style={{...styles.container, backgroundColor: Theme.colors.card}}>
      <Dropdown
        data={options}
        style={styles.drop}
        maxHeight={200}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedText}
        labelField={label}
        valueField={value}
        onChange={setSelectedQuality}
        renderItem={item => {
          return (
            <View style={styles.itemContainer}>
              <Text style={fontStyle.bodyText}>{item[label]}</Text>
              <Text style={fontStyle.bodyText}>{item[value]}</Text>
            </View>
          );
        }}
        renderLeftIcon={() => {
          return (
            <View style={styles.leftContainer}>
              <Icon icon={icon} style={styles.leftImage} />
              <Text style={{...Theme.fonts.bodyText, ...styles.text}}>
                {headerLabel}
              </Text>
            </View>
          );
        }}
        renderRightIcon={() => {
          return (
            <View style={styles.rightContainer}>
              <Text style={{...Theme.fonts.bodyText, ...styles.rightText}}>
                {selectedQuality}
              </Text>
              <Icon icon={'dropDown'} style={styles.imageStyle} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ListTile;
const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 5,
    marginHorizontal: 3,
    borderRadius: 12,
  },
  drop: {
    height: 60,
    // backgroundColor: 'white',
  },
  selectedText: {
    color: 'white',
    display: 'none',
  },
  placeholderStyle: {
    display: 'none',
  },
  rightText: {
    fontSize: 12,
  },
  text: {
    flexDirection: 'row',
    flex: 1,
  },
  imageStyle: {
    height: 18,
    width: 18,
    marginLeft: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    backfaceVisibility: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftImage: {
    height: 25,
    width: 25,
    marginRight: 8,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: 'rgba(40,40,40,1)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
