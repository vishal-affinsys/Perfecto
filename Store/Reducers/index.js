import imageReducer from './Images';
import VideoReducer from './Videos';
import storageReducer from './Storage';
import Settings from './Settings';
import ThemeReducer from './Theme';
import {getPaginatedImages, getSearchImages, clearSearch} from './Images';
import {
  changePhotoQuality,
  changeVideoQuality,
  getPhotoQuality,
  getVideoQuality,
} from './Settings';
import {
  getPhotosFromLocal,
  getVideosFromLocal,
  saveImagesToLocal,
  saveVideosToLocal,
  removeImageFromLocal,
  removeVideoFromLocal,
} from './Storage';
import {setTheme, getTheme, getThemeData} from './Theme';
import {getVideos, getSearchedVideos} from './Videos';

export {imageReducer, VideoReducer, storageReducer, Settings, ThemeReducer};
export {
  getPaginatedImages,
  getSearchImages,
  clearSearch,
  changePhotoQuality,
  changeVideoQuality,
  getPhotoQuality,
  getVideoQuality,
  getPhotosFromLocal,
  getVideosFromLocal,
  saveImagesToLocal,
  saveVideosToLocal,
  removeImageFromLocal,
  removeVideoFromLocal,
  setTheme,
  getTheme,
  getVideos,
  getSearchedVideos,
  getThemeData,
};
