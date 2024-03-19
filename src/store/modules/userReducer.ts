import { createSlice } from '@reduxjs/toolkit';

export interface User {
  username: string;
  nickname: string;
}

const INIT_STATE = { username: '', nickname: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    setUserState: (state, action) => {
      return action.payload;
    },
    reqUserData: () => {},
    logoutReducer: () => {
      return INIT_STATE;
    }
  }
});

export const { setUserState, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
