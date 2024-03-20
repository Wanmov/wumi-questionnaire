import { CompState, ComponentItem } from './modules/compReducer';

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: CompState, newComponent: ComponentItem) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);

  if (index < 0) {
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}
