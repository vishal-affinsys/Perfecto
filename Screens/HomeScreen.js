import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import fontStyle from '../helpers/Font';
import APIController, {Endpoints} from '../API/APIControllers';
import {useNavigation} from '@react-navigation/native';
import Theme from '../helpers/Theme';
import Icon from '../helpers/Icons';
import CustomList from '../components/CustomList';

const HomeScreen = () => {
  const [image, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      let data = await APIController.getData(Endpoints.paginatedData(page));
      setImages(previous => [...previous, ...data.photos]);
    }
    getData();
  }, [setImages, page]);

  return (
    <View style={Theme.body}>
      <StatusBar backgroundColor={'rgba(25,25,25,0.9)'} animated={true} />
      <View style={style.header}>
        <Text style={{...fontStyle.h1, ...Theme.headingStyle}}>
          Trending wallpapers
        </Text>
        <View style={style.searchContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('searchScreen');
            }}
            style={style.searchPressable}
            android_ripple={{color: 'white'}}>
            <Image style={style.searchIcon} source={Icon.search} />
          </Pressable>
        </View>
      </View>
      <CustomList images={image} setPage={setPage} />
    </View>
  );
};

const style = StyleSheet.create({
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
});

export default HomeScreen;
