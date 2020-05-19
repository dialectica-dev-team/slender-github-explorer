import { PopperActions } from './../actions';

export type State = {
  open: boolean;
  anchorEl?: HTMLElement;
};

export const INITIAL_STATE: State = {
  open: false,
};

export default (state = INITIAL_STATE, { type, payload }: PopperActions) => {
  switch (type) {
    case 'SET_OPEN_STATE':
      return { ...state, ...payload };
    default:
      return state;
  }
};
