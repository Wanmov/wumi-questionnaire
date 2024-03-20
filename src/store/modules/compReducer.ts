import { produce } from 'immer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ComponentItemProps } from '../../components/QuestionComponents';
import { insertNewComponent } from '../utils';

export interface ComponentItem {
  fe_id: string; // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentItemProps;
}

export interface CompState {
  selectedId: string;
  componentList: Array<ComponentItem>;
  copiedComponent: ComponentItem | null;
}

const INIT_STATE: CompState = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
};

export const compSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    setCompState: (state: CompState, action: PayloadAction<Partial<CompState>>) => {
      return { ...state, ...action.payload };
    },
    addComponent: produce((draft: CompState, action: PayloadAction<ComponentItem>) => {
      const newComponent = action.payload;
      insertNewComponent(draft, newComponent);
    })
  }
});

export const { setCompState, addComponent } = compSlice.actions;
export default compSlice.reducer;
