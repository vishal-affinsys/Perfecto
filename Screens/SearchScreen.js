import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import theme from '../helpers/Theme';
import CustomList from '../components/CustomList';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {clearSearch, getSearchImages} from '../Store/Reducers';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState(null);
  const [onChangeText, setOnChangeText] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const imageRdx = useSelector(state => state.image);

  const Theme = useTheme();

  useEffect(() => {
    if (searchText === null) {
      dispatch(clearSearch());
    } else if (searchText !== null) {
      dispatch(getSearchImages({page: page, query: searchText}));
    }
  }, [dispatch, searchText, page]);

  return (
    <View style={theme.body}>
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
      <CustomList images={imageRdx.searchedImages} setPage={setPage} />
    </View>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    borderWidth: 2,
    margin: 8,
    borderRadius: 12,
    paddingLeft: 12,
  },
});

export default SearchScreen;
