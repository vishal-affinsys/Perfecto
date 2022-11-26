import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Text,
} from 'react-native';
import APIController, {Endpoints} from '../API/APIControllers';
import {useNavigation} from '@react-navigation/native';
import fontStyle from '../helpers/Font';
import Theme from '../helpers/Theme';
import Icon from '../helpers/Icons';
import CustomList from '../components/CustomList';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState(null);
  const [onChangeText, setOnChangeText] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      let data = await APIController.getData(
        Endpoints.search(page, searchText),
      );
      setImages(previous => [...previous, ...data.photos]);
      //   APIController.logger(data);
    }
    getData();
    APIController.logger(page + searchText);
  }, [searchText, page]);

  return (
    <View style={Theme.body}>
      <TextInput
        placeholder="search"
        style={style.inputStyle}
        defaultValue={''}
        maxLength={30}
        placeholderTextColor={'white'}
        onChangeText={value => {
          //   console.log(value);
          setOnChangeText(value);
        }}
        autoFocus={true}
        inlineImageLeft="search.png"
        onEndEditing={() => {
          setSearchText(onChangeText);
        }}
      />
      <CustomList images={images} setPage={setPage} />
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

export default SearchScreen;
