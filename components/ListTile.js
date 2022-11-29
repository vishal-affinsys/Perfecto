import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import fontStyle from '../helpers/Font';

const ListTile = ({
  options,
  headerLabel,
  label,
  value,
  icon,
  selectedQuality,
  setSelectedQuality,
}) => {
  return (
    <View style={styles.container}>
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
              <Image source={icon} style={styles.leftImage} />
              <Text style={{...fontStyle.bodyText, ...styles.text}}>
                {headerLabel}
              </Text>
            </View>
          );
        }}
        renderRightIcon={() => {
          return (
            <View style={styles.rightContainer}>
              <Text style={styles.rightText}>{selectedQuality}</Text>
              <Image
                source={require('../assets/images/drop-down.png')}
                style={styles.imageStyle}
              />
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
    backgroundColor: 'rgba(50,50,50,1)',
    padding: 12,
    marginVertical: 5,
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
    color: 'rgba(200,200,200,1)',
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
