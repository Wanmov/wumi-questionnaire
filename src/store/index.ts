import { configureStore } from '@reduxjs/toolkit';
import userReducer, { User } from './modules/userReducer';
import compReducer, { CompState } from './modules/compReducer';

export interface AppState {
  user: User;
  component: CompState;
}

export default configureStore({
  reducer: {
    user: userReducer,
    component: compReducer
  }
});
