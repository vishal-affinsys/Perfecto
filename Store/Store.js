import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  imageReducer,
  VideoReducer,
  storageReducer,
  Settings,
  ThemeReducer,
} from './Reducers';

const reducer = combineReducers({
  image: imageReducer,
  video: VideoReducer,
  storage: storageReducer,
  setting: Settings,
  theme: ThemeReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
