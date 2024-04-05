import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageInfo {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
}

const INIT_STATE: PageInfo = {
  title: '',
  desc: '',
  js: '',
  css: ''
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    setPageInfoState: (state: PageInfo, action: PayloadAction<PageInfo>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setPageInfoState } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
