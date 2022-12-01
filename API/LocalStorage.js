import AsyncStorage from '@react-native-async-storage/async-storage';
import APIController from './APIControllers';
export const Operations = {
  video: 'video',
  photo: 'photo',
  photoQuality: 'photoQ',
  videoQuality: 'videoQ',
  theme: 'Theme',
};

class LocalStorage {
  static async saveToLocal(key, data) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      APIController.logger(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async getDatafromLocal(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      let res = jsonValue != null ? JSON.parse(jsonValue) : [];
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateData(key, item) {
    try {
      let data = await this.getDatafromLocal(key);
      if (data === null) {
        data = [];
      }
      data.push(item);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      APIController.logger(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async removeData(key, itemId) {
    try {
      let data = await this.getDatafromLocal(key);
      if (data === null) {
        data = [];
        return data;
      }
      data = data.filter(val => val.id !== itemId);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default LocalStorage;
