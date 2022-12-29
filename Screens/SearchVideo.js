import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import VideoList from '../components/VideoList';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../helpers/Theme';
import {clearVideoSearch, getSearchedVideos} from '../Store/Reducers';

const SearchVideo = () => {
  const [searchText, setSearchText] = useState(null);
  const [onChangeText, setOnChangeText] = useState(null);
  // const [video, setVideo] = useState([]);
  const [page, setPage] = useState(1);

  const Theme = useTheme();

  const dispatch = useDispatch();
  const videoRdx = useSelector(state => state.video);

  useEffect(() => {
    if (searchText !== null) {
      dispatch(getSearchedVideos({page: page, query: searchText}));
    } else if (searchText === null) {
      dispatch(clearVideoSearch());
    }
  }, [dispatch, searchText, page]);

  return (
    <View style={theme.body}>
      <TextInput
        placeholder="search"
        style={{
          ...style.inputStyle,
          color: Theme.fonts.h6.color,
          borderColor: Theme.colors.border,
        }}
        defaultValue={''}
        maxLength={30}
        returnKeyType="search"
        placeholderTextColor={Theme.fonts.h6.color}
        onChangeText={value => {
          setOnChangeText(value);
          if (value.length === 0) {
            setSearchText(null);
          }
        }}
        autoFocus={true}
        inlineImageLeft="search.png"
        onEndEditing={() => {
          setSearchText(onChangeText);
        }}
      />
      <VideoList
        videos={videoRdx.searchedVideos}
        setPage={setPage}
        styleList={style.videoList}
      />
    </View>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    borderWidth: 0.5,
    margin: 8,
    borderRadius: 12,
    paddingLeft: 12,
  },
  videoList: {
    flex: 1,
    // height: 200,
  },
});

export default SearchVideo;
