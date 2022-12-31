import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Endpoints, BaseAPIHandler} from '../../API/APIControllers';
import * as Actions from '../Actions';

const initialState = {
  popularVideos: [],
  searchedVideos: [],
  loading: false,
  status: '',
  error: '',
};

export const getVideos = createAsyncThunk(
  Actions.GET_POPULAR_VIDEOS,
  async page => {
    const res = await BaseAPIHandler.getData(Endpoints.popularVideo(page));
    return res;
  },
);

export const getSearchedVideos = createAsyncThunk(
  Actions.GET_SEARCH_VIDEO,
  async ({page, query}) => {
    const res = await BaseAPIHandler.getData(
      Endpoints.searchVideo(page, query),
    );
    return res;
  },
);

const videoSlice = createSlice({
  name: 'videos',
  initialState: initialState,
  reducers: {
    clearSearch: (state, action) => {
      state.searchedVideos = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVideos.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'success';
        state.popularVideos = state.popularVideos.concat(action.payload.videos);

        if (action.payload.error !== undefined) {
          state.status = 'failed';
          state.error = 'Server error: ' + action.payload.message;
          state.popularVideos = [];
        }
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSearchedVideos.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getSearchedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'success';
        state.searchedVideos = state.searchedVideos.concat(
          action.payload.videos,
        );
        if (action.payload.error) {
          state.status = 'failed';
          state.error = action.payload.message;
          state.searchedVideos = [];
        }
      })
      .addCase(getSearchedVideos.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default videoSlice.reducer;
export const clearVideoSearch = videoSlice.actions.clearSearch;
