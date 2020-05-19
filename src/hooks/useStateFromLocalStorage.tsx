import React from 'react';
import { CombinedState } from '../typings';
import defaultsDeep from 'lodash/defaultsDeep';



const useStateFromLocalStorage = <S extends object>(key: string, defaults: Partial<CombinedState>) => {

  const [ state, setPersistedState ] = React.useState<S | undefined>();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const statePersistHandler = React.useCallback((state: S) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.warn("Couldn't persist state on local storage");
    }
  }, [ key ]);

  React.useEffect(() => {
    setLoading(true);
    try {
      const state = localStorage.getItem(key) || '';
      setPersistedState(state ? defaultsDeep(JSON.parse(state), defaults) : defaults);
    } catch (err) {
      console.warn("Couldn't restore state", err);
    } finally {
      setLoading(false)
    }
  }, [ key, defaults ]);

  return [ state, loading, statePersistHandler ];
}

export default useStateFromLocalStorage;