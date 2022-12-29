import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage, {Operations} from '../../API/LocalStorage';
import {selectedTheme} from '../../helpers/Quality';
import {CustomDarkTheme, CustomLightTheme} from '../../helpers/ThemeData';
import * as Actions from '../Actions';

const initialState = {
  selectedTheme: selectedTheme[0],
  themeData: CustomDarkTheme,
  loading: false,
  status: '',
};

export const setTheme = createAsyncThunk(Actions.CHANGE_THEME, async item => {
  await LocalStorage.saveToLocal(Operations.theme, item);
  return item;
});

export const getTheme = createAsyncThunk(Actions.GET_THEME, async item => {
  let res = await LocalStorage.getDatafromLocal(Operations.theme);
  return res;
});

function getThemeData(value) {
  if (value === 'Dark') {
    return CustomDarkTheme;
  } else if (value === 'Light') {
    return CustomLightTheme;
  } else if (value === 'System default') {
    return false;
  }
}

const ThemeReducer = createSlice({
  name: 'Theme',
  reducer: {},
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(setTheme.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(setTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'success';
        state.selectedTheme = action.payload;
        state.themeData = getThemeData(action.payload.theme);
      })
      .addCase(setTheme.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
      })
      .addCase(getTheme.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'success';
        if (action.payload.length !== 0) {
          state.selectedTheme = action.payload;
          state.themeData = getThemeData(action.payload.theme);
        }
      })
      .addCase(getTheme.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
      });
  },
});

export default ThemeReducer.reducer;
