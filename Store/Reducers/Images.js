import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import APIController, {Endpoints} from '../../API/APIControllers';
import * as Actions from '../Actions';
const initialState = {
  images: [],
  searchedImages: [],
  loading: false,
  status: '',
  error: '',
};

export const getPaginatedImages = createAsyncThunk(
  //action type string
  Actions.GET_PAGINATED_IMAGES,
  // callback function
  async page => {
    const res = await APIController.getData(Endpoints.paginatedData(page));
    return res;
  },
);

export const getSearchImages = createAsyncThunk(
  Actions.GET_SEARCH_PHOTOS,
  async ({page, query}) => {
    const res = await APIController.getData(Endpoints.search(page, query));
    return res;
  },
);

export const imageSlice = createSlice({
  name: 'images',
  initialState: initialState,
  reducers: {
    clearSearch: (state, action) => {
      state.searchedImages = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPaginatedImages.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getPaginatedImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.images = state.images.concat(action.payload.photos);
        if (action.payload.error !== undefined) {
          state.status = 'failed';
          state.error = 'Server error: ' + action.payload.error;
          state.images = [];
        }
      })
      .addCase(getPaginatedImages.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSearchImages.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getSearchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.searchedImages = state.searchedImages.concat(
          action.payload.photos,
        );
      })
      .addCase(getSearchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
export const clearSearch = imageSlice.actions.clearSearch;
