import { Action } from '../typings';
import { useDispatch } from 'react-redux';

export type SetOpenState = Action<'SET_OPEN_STATE', { open: boolean, anchorEl?: HTMLElement }>;

export type PopperActions = SetOpenState;

export default () => {
  const dispatch = useDispatch();

  return {
    setOpen: (open: boolean, anchorEl?: HTMLElement) => dispatch<SetOpenState>({ type: 'SET_OPEN_STATE', payload: { open, anchorEl } }),
  };
};
