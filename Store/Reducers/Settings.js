import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage, {Operations} from '../../API/LocalStorage';
import * as Actions from '../Actions';

const initialState = {
  videoQuality: {pixels: '1080p', quality: 'FHD'},
  imageQuality: {size: 'Original', quality: 'original'},
  error: {image: '', video: ''},
  loading: {image: false, video: false},
  status: {image: '', video: ''},
};

export const changePhotoQuality = createAsyncThunk(
  Actions.CHANGE_PHOTO_QUALITY,
  async item => {
    await LocalStorage.saveToLocal(Operations.photoQuality, item);
    return item;
  },
);

export const changeVideoQuality = createAsyncThunk(
  Actions.CHANGE_VIDEO_QUALITY,
  async item => {
    await LocalStorage.saveToLocal(Operations.videoQuality, item);
    return item;
  },
);

export const getPhotoQuality = createAsyncThunk(
  Actions.GET_PHOTO_QUALITY,
  async item => {
    let res = await LocalStorage.getDatafromLocal(Operations.photoQuality);

    return res;
  },
);

export const getVideoQuality = createAsyncThunk(
  Actions.GET_VIDEO_QUALITY,
  async item => {
    let res = await LocalStorage.getDatafromLocal(Operations.videoQuality);

    return res;
  },
);

const settings = createSlice({
  name: 'Settings',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changePhotoQuality.pending, (state, action) => {
        state.loading.image = true;
        state.status.image = 'loading';
      })
      .addCase(changePhotoQuality.fulfilled, (state, action) => {
        state.loading.image = false;
        state.status.image = 'success';
        state.imageQuality = action.payload;
      })
      .addCase(changePhotoQuality.rejected, (state, action) => {
        state.loading.image = false;
        state.status.image = 'failed';
      })
      .addCase(changeVideoQuality.pending, (state, action) => {
        state.loading.video = true;
        state.status.video = 'loading';
      })
      .addCase(changeVideoQuality.fulfilled, (state, action) => {
        state.loading.video = false;
        state.status.video = 'success';
        state.videoQuality = action.payload;
      })
      .addCase(changeVideoQuality.rejected, (state, action) => {
        state.loading.video = false;
        state.status.video = 'failed';
      })
      .addCase(getPhotoQuality.pending, (state, action) => {
        state.loading.image = true;
        state.status.image = 'loading';
      })
      .addCase(getPhotoQuality.fulfilled, (state, action) => {
        state.loading.image = false;
        state.status.image = 'success';

        if (action.payload.length !== 0) {
          state.imageQuality = action.payload;
        }
      })
      .addCase(getPhotoQuality.rejected, (state, action) => {
        state.loading.image = false;
        state.status.image = 'failed';
      })
      .addCase(getVideoQuality.pending, (state, action) => {
        state.loading.video = true;
        state.status.video = 'loading';
      })
      .addCase(getVideoQuality.fulfilled, (state, action) => {
        state.loading.video = false;
        state.status.video = 'success';
        if (action.payload.length !== 0) {
          state.videoQuality = action.payload;
        }
      })
      .addCase(getVideoQuality.rejected, (state, action) => {
        state.loading.video = false;
        state.status.video = 'failed';
      });
  },
});

export default settings.reducer;
