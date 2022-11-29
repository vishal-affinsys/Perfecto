import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Theme from '../helpers/Theme';
import VideoList from '../components/VideoList';
import {useDispatch, useSelector} from 'react-redux';
import {clearVideoSearch, getSearchedVideos} from '../Store/Videos';

const SearchVideo = () => {
  const [searchText, setSearchText] = useState(null);
  const [onChangeText, setOnChangeText] = useState(null);
  // const [video, setVideo] = useState([]);
  const [page, setPage] = useState(1);

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
    <View style={Theme.body}>
      <TextInput
        placeholder="search"
        style={style.inputStyle}
        defaultValue={''}
        maxLength={30}
        returnKeyType="search"
        placeholderTextColor={'white'}
        onChangeText={value => {
          //   console.log(value);
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
      <VideoList videos={videoRdx.searchedVideos} setPage={setPage} />
    </View>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    borderColor: 'rgba(240,240,240,1)',
    borderWidth: 0.5,
    margin: 8,
    borderRadius: 20,
    paddingLeft: 12,
    color: 'white',
  },
  footerText: {
    color: 'rgba(200,200,245,1)',
    textAlign: 'right',
    fontSize: 20,
  },
  imageStyle: {
    height: 300,
    borderRadius: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchIcon: {
    height: 50,
    width: 50,
  },

  searchContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
    overflow: 'hidden',
    borderRadius: 40,
    marginRight: 12,
  },

  searchPressable: {
    padding: 8,
  },

  loadContainer: {
    backgroundColor: 'rgba(40,40,40,1)',
    marginRight: 20,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  pressableComponent: {
    padding: 8,
  },
  imageButton: {
    overflow: 'hidden',
    margin: 10,
  },
});

export default SearchVideo;
