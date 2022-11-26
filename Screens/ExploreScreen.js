import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import APIController, {Endpoints} from '../API/APIControllers';
import fontStyle from '../helpers/Font';
import Theme from '../helpers/Theme';
import {useNavigation} from '@react-navigation/native';
import Icon from '../helpers/Icons';
import VideoList from '../components/VideoList';

const ExploreScreen = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      let data = await APIController.getData(Endpoints.popularVideo(page));
      setVideos(previous => [...previous, ...data.videos]);
    }
    getData();
  }, [setVideos, page]);

  return (
    <View style={Theme.body}>
      <View style={style.header}>
        <View>
          <Text style={{...fontStyle.h1, ...Theme.headingStyle}}>Popular</Text>
          <Text style={{...fontStyle.h1, ...Theme.headingStyle}}>videos</Text>
        </View>
        <View style={style.searchContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('searchVideo');
            }}
            style={style.searchPressable}
            android_ripple={{color: 'white'}}>
            <Image style={style.searchIcon} source={Icon.search} />
          </Pressable>
        </View>
      </View>
      <VideoList videos={videos} setPage={setPage} />
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
    backgroundColor: 'rgba(40,40,40,1)',
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
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
