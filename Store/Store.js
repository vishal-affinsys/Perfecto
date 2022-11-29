import {configureStore, combineReducers} from '@reduxjs/toolkit';
import imageReducer from './Images';
import VideoReducer from './Videos';
import storageReducer from './Storage';
import Settings from './Settings';

const reducer = combineReducers({
  image: imageReducer,
  video: VideoReducer,
  storage: storageReducer,
  setting: Settings,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
