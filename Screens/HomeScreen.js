import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import fontStyle from '../helpers/Font';
import APIController, {Endpoints} from '../API/APIControllers';
import {useNavigation} from '@react-navigation/native';
import Theme from '../helpers/Theme';
import Icon from '../helpers/Icons';
import CustomList from '../components/CustomList';
import IconButton from '../components/IconButton';
// import {useSelector, useDispatch} from 'react-redux';
import {fetchDataAction} from '../Store/UserActions';

const HomeScreen = () => {
  const [image, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  // const user = useSelector(state => state.user);
  // const {usersData, loading, error} = user;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchDataAction(Endpoints.paginatedData(page)))
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });

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
        <View>
          <Text style={{...fontStyle.h1, ...Theme.headingStyle}}>Trending</Text>
          <Text
            style={{
              ...fontStyle.h1,
              ...Theme.headingStyle,
              ...style.wallpaper,
            }}>
            wallpapers
          </Text>
        </View>
        <IconButton
          styleContainer={style.searchContainer}
          styleImage={style.searchIcon}
          onPress={() => {
            navigation.navigate('searchScreen');
          }}
          icon={Icon.search}
        />
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

  wallpaper: {
    color: 'rgba(100,83,190,1)',
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
