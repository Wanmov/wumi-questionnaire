import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
import userReducer, { User } from './modules/userReducer';
import compReducer, { CompState } from './modules/compReducer';
import pageReducer, { PageInfo } from './modules/pageReducer';

export interface AppState {
  user: User;
  components: StateWithHistory<CompState>;
  page: PageInfo;
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(compReducer, {
      limit: 10, // 限制 undo 10 步
      filter: excludeAction(['components/setCompState', 'components/selectComponent'])
    }),
    page: pageReducer
  }
});
