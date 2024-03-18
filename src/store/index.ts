import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userReducer';

interface User {
  username: string;
  nickname: string;
}

export interface AppState {
  user: User;
}

export default configureStore({
  reducer: {
    user: userReducer
  }
});
