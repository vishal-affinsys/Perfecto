import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import APIController from '../API/APIControllers';
import LocalStorage, {Operations} from '../API/LocalStorage';
import * as Actions from './Actions';

const initialState = {
  videos: [],
  photos: [],
  loading: {videos: false, photos: false},
  status: {videos: '', photos: ''},
  error: {videos: '', photos: ''},
};

export const getPhotosFromLocal = createAsyncThunk(
  Actions.GET_PHOTOS_FROM_LOCAL,
  async options => {
    const res = await LocalStorage.getDatafromLocal(Operations.photo);
    return res;
  },
);

export const saveImagesToLocal = createAsyncThunk(
  Actions.ADD_PHOTOS_TO_LOCAL,
  async item => {
    await LocalStorage.updateData(Operations.photo, item);
    return item;
  },
);

export const removeImageFromLocal = createAsyncThunk(
  Actions.REMOVE_PHOTO_FROM_LOCAL,
  async itemId => {
    const res = await LocalStorage.removeData(Operations.photo, itemId);
    APIController.logger(res);
    return res;
  },
);

export const removeVideoFromLocal = createAsyncThunk(
  Actions.REMOVE_VIDEO_FROM_LOCAL,
  async itemId => {
    const res = await LocalStorage.removeData(Operations.video, itemId);
    return res;
  },
);

export const getVideosFromLocal = createAsyncThunk(
  Actions.GET_VIDEOS_FROM_LOCAL,
  async options => {
    const res = await LocalStorage.getDatafromLocal(Operations.video);
    APIController.logger(res);
    return res;
  },
);

export const saveVideosToLocal = createAsyncThunk(
  Actions.ADD_VIDEOS_TO_LOCAL,
  async item => {
    await LocalStorage.updateData(Operations.video, item);
    return item;
  },
);

const storageSlice = createSlice({
  name: 'storage',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPhotosFromLocal.pending, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'loading';
      })
      .addCase(getPhotosFromLocal.fulfilled, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'success';
        state.photos = state.photos.concat(action.payload);
      })
      .addCase(getPhotosFromLocal.rejected, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'failed';
        state.error.photos = 'Somthing went wrong \n' + action.error.message;
      })
      .addCase(getVideosFromLocal.pending, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'loading';
      })
      .addCase(getVideosFromLocal.fulfilled, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'success';
        state.videos = state.videos.concat(action.payload);
      })
      .addCase(getVideosFromLocal.rejected, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'failed';
        state.error.videos = 'Somthing went wrong \n' + action.error.message;
      })
      .addCase(saveImagesToLocal.pending, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'loading';
      })
      .addCase(saveImagesToLocal.fulfilled, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'success';
        state.photos = state.photos.concat(action.payload);
      })
      .addCase(saveImagesToLocal.rejected, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'failed';
        state.error.photos = 'Somthing went wrong \n' + action.error.message;
      })
      .addCase(saveVideosToLocal.pending, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'loading';
      })
      .addCase(saveVideosToLocal.fulfilled, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'success';
        state.videos = state.videos.concat(action.payload);
      })
      .addCase(saveVideosToLocal.rejected, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'failed';
        state.error.videos = 'Somthing went wrong \n' + action.error.message;
      })
      .addCase(removeImageFromLocal.pending, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'loading';
      })
      .addCase(removeImageFromLocal.fulfilled, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'success';
        state.photos = action.payload;
      })
      .addCase(removeImageFromLocal.rejected, (state, action) => {
        state.loading.photos = true;
        state.status.photos = 'failed';
        state.error.photos = 'Somthing went wrong \n' + action.error.message;
      })
      .addCase(removeVideoFromLocal.pending, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'loading';
      })
      .addCase(removeVideoFromLocal.fulfilled, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'success';
        state.videos = action.payload;
      })
      .addCase(removeVideoFromLocal.rejected, (state, action) => {
        state.loading.videos = true;
        state.status.videos = 'failed';
        state.error.videos = 'Somthing went wrong \n' + action.error.message;
      });
  },
});

export default storageSlice.reducer;
