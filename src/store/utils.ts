import { CompState, ComponentItem } from './modules/compReducer';

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: CompState, newComponent: ComponentItem) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((comp) => comp.fe_id === selectedId);

  if (index < 0) {
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}

/**
 * 获取下一个 selectedId
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentItem[]) {
  const visibleComponentList = componentList.filter((comp) => !comp.isHidden);
  const index = visibleComponentList.findIndex((comp) => comp.fe_id === fe_id);
  if (index < 0) return '';

  let newSelectedId = '';
  const length = visibleComponentList.length;

  if (length > 1) {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}
