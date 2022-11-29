import {configureStore, combineReducers} from '@reduxjs/toolkit';
import imageReducer from './Images';
import VideoReducer from './Videos';
import storageReducer from './Storage';

const reducer = combineReducers({
  image: imageReducer,
  video: VideoReducer,
  storage: storageReducer,
});

export const store = configureStore({reducer});
