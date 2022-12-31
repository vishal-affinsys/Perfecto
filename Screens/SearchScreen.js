import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet, Animated} from 'react-native';
import theme from '../helpers/Theme';
import CustomList from '../components/CustomList';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {clearSearch, getSearchImages} from '../Store/Reducers';

const SearchScreen = ({route}) => {
  const [searchText, setSearchText] = useState(null);
  const [onChangeText, setOnChangeText] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const imageRdx = useSelector(state => state.image);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const Theme = useTheme();
  const MAX_SEARCH_HEIGHT = 120;

  const searchTranslate = scrollY.interpolate({
    inputRange: [0, MAX_SEARCH_HEIGHT * 5],
    outputRange: [0, -MAX_SEARCH_HEIGHT],
    extrapolate: 'clamp',
  });
  const searchScale = scrollY.interpolate({
    inputRange: [0, MAX_SEARCH_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const searchOpacity = scrollY.interpolate({
    inputRange: [0, MAX_SEARCH_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (searchText === null) {
      dispatch(clearSearch());
    } else if (searchText !== null) {
      dispatch(getSearchImages({page: page, query: searchText}));
    }
  }, [dispatch, searchText, page]);

  return (
    <View style={theme.body}>
      <Animated.View
        style={{
          ...style.animate,
          transform: [{translateY: searchTranslate}, {scale: searchScale}],
          opacity: searchOpacity,
        }}>
        <TextInput
          placeholder="search"
          style={{
            ...style.inputStyle,
            borderColor: Theme.colors.border,
            color: Theme.fonts.h5.color,
          }}
          defaultValue={''}
          maxLength={30}
          returnKeyType="search"
          placeholderTextColor={Theme.fonts.h1.color}
          onChangeText={value => {
            setOnChangeText(value);
            if (value.length === 0) {
              setSearchText(null);
            }
          }}
          autoFocus={true}
          onEndEditing={() => {
            setSearchText(onChangeText);
          }}
        />
      </Animated.View>
      <CustomList
        images={imageRdx.searchedImages}
        setPage={setPage}
        scrollY={scrollY}
        paddingTop={MAX_SEARCH_HEIGHT}
      />
    </View>
  );
};

const style = StyleSheet.create({
  animate: {
    paddingTop: 25,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  inputStyle: {
    borderWidth: 2,
    margin: 8,
    borderRadius: 12,
    paddingLeft: 12,
  },
});

export default SearchScreen;
