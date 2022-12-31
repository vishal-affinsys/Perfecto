import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseAPIHandler} from './APIControllers';

export const Operations = {
  video: 'video',
  photo: 'photo',
  photoQuality: 'photoQ',
  videoQuality: 'videoQ',
  theme: 'Theme',
  logs: 'Logs',
};

class LocalStorage {
  static async saveToLocal(key, data) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      BaseAPIHandler.logger(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async getDatafromLocal(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      let res = jsonValue != null ? JSON.parse(jsonValue) : [];
      BaseAPIHandler.logger(res);
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
      BaseAPIHandler.logger(data);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(data);
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
      BaseAPIHandler.logger(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default LocalStorage;
