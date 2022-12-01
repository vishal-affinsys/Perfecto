import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import fontStyle from '../helpers/Font';
import theme from '../helpers/Theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import VideoList from '../components/VideoList';
import IconButton from '../components/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {getVideos} from '../Store/Reducers';

const ExploreScreen = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const videoRdx = useSelector(state => state.video);
  const Theme = useTheme();

  useEffect(() => {
    dispatch(getVideos(page));
  }, [dispatch, page]);

  return (
    <View style={theme.body}>
      <View style={style.header}>
        <View>
          <Text style={Theme.fonts.h1}>Popular</Text>
          <Text
            style={{
              ...fontStyle.h1,
              ...Theme.headingStyle,
              ...style.videos,
            }}>
            Videos
          </Text>
        </View>
        <IconButton
          icon={'search'}
          onPress={() => {
            navigation.navigate('searchVideo');
          }}
          styleContainer={style.searchContainer}
          styleImage={style.searchIcon}
        />
      </View>
      <VideoList videos={videoRdx.popularVideos} setPage={setPage} />
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
  },
  videos: {
    color: 'rgba(190,120,55,1)',
    marginBottom: 5,
  },
  searchPressable: {
    padding: 8,
  },
  searchIcon: {
    height: 50,
    width: 50,
  },
  imageStyle: {
    height: 200,
    margin: 2,
    borderRadius: 12,
    // width: '100%',
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
});

export default ExploreScreen;
