import { produce } from 'immer';
import _ from 'lodash';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { ComponentItemProps } from '../../components/QuestionComponents';
import { getNextSelectedId, insertNewComponent } from '../utils';
import { arrayMove } from '@dnd-kit/sortable';

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
    }),
    changeCompProps: produce(
      (draft: CompState, action: PayloadAction<{ fe_id: string; newProps: ComponentItemProps }>) => {
        const { fe_id, newProps } = action.payload;

        const curComp = draft.componentList.find((comp) => comp.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps
          };
        }
      }
    ),
    removeSelectedComp: produce((draft: CompState) => {
      const { componentList = [], selectedId: removedId } = draft;

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex((comp) => comp.fe_id === removedId);
      componentList.splice(index, 1);
    }),
    changeCompHide: produce((draft: CompState, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
      const { componentList = [] } = draft;
      const { fe_id, isHidden } = action.payload;

      let newSelectedId = '';
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        newSelectedId = fe_id;
      }
      draft.selectedId = newSelectedId;

      const curComp = componentList.find((comp) => comp.fe_id === fe_id);
      if (curComp) curComp.isHidden = isHidden;
    }),
    changeCompTitle: produce((draft: CompState, action: PayloadAction<{ fe_id: string; title: string }>) => {
      const { title, fe_id } = action.payload;
      const curComp = draft.componentList.find((comp) => comp.fe_id === fe_id);
      if (curComp) curComp.title = title;
    }),
    toggleCompLocked: produce((draft: CompState, action: PayloadAction<{ fe_id: string }>) => {
      const { fe_id } = action.payload;

      const curComp = draft.componentList.find((comp) => comp.fe_id === fe_id);
      if (curComp) curComp.isLocked = !curComp.isLocked;
    }),
    copySelectedComp: produce((draft: CompState) => {
      const { selectedId, componentList = [] } = draft;
      const selectedComponent = componentList.find((comp) => comp.fe_id === selectedId);
      if (selectedComponent == null) return;
      draft.copiedComponent = _.cloneDeep(selectedComponent); // 深拷贝
    }),
    pasteCopiedComp: produce((draft: CompState) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;

      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
    selectComponent: produce((draft: CompState, action: PayloadAction<{ isUp: boolean }>) => {
      const { selectedId, componentList } = draft;
      const { isUp } = action.payload;
      const selectedIndex = componentList.findIndex((comp) => comp.fe_id === selectedId);

      if (selectedIndex < 0) return;
      if (isUp) {
        if (selectedIndex === 0) return;
        draft.selectedId = componentList[selectedIndex - 1].fe_id;
      } else {
        if (selectedIndex + 1 === componentList.length) return;
        draft.selectedId = componentList[selectedIndex + 1].fe_id;
      }
    }),
    moveComp: produce((draft: CompState, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { componentList: curComponentList } = draft;
      const { oldIndex, newIndex } = action.payload;

      draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
    })
  }
});

export const {
  setCompState,
  addComponent,
  changeCompProps,
  removeSelectedComp,
  changeCompHide,
  changeCompTitle,
  toggleCompLocked,
  copySelectedComp,
  pasteCopiedComp,
  selectComponent,
  moveComp
} = compSlice.actions;
export default compSlice.reducer;
