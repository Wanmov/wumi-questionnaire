import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { copySelectedComp, pasteCopiedComp, removeSelectedComp, selectComponent } from '../store/modules/compReducer';

function isActiveElement() {
  const activeEle = document.activeElement;
  if (activeEle === document.body) return true;
  return false;
}

export const useToolsShortcutKeys = () => {
  const dispatch = useDispatch();

  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElement()) return;
    dispatch(removeSelectedComp());
  });

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElement()) return;
    dispatch(copySelectedComp());
  });

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElement()) return;
    dispatch(pasteCopiedComp());
  });

  useKeyPress('uparrow', () => {
    if (!isActiveElement()) return;
    dispatch(selectComponent({ isUp: true }));
  });

  useKeyPress('downarrow', () => {
    if (!isActiveElement()) return;
    dispatch(selectComponent({ isUp: false }));
  });
};
