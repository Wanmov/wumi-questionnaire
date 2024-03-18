import { createSlice } from '@reduxjs/toolkit';

const INIT_STATE = { username: '', nickname: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state, action) => {
      return action.payload;
    },
    logoutReducer: () => {
      return INIT_STATE;
    }
  }
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
