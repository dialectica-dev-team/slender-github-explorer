import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, Store } from 'redux';
import createClient from './apollo';
import './App.css';
import useStateFromLocalStorage from './hooks/useStateFromLocalStorage';
import Main from './layout/Main';
import reducers, { initialState } from './reducers';
import theme from './theme';
import { CombinedState } from './typings';


function App() {
  const [ persistedState, , persistState ] = useStateFromLocalStorage('slender-state', initialState);
  const store = React.useMemo<Store>(() => createStore(reducers, persistedState), [ persistedState ]);

  // Subscribe the persist listener on state updates
  // while subscribe the listener unsubscriber on unmount
  React.useEffect(() => {
    return store.subscribe(() => {
      const { app, issues } = store.getState();
      persistState({ app, issues });
    })
  }, [ store, persistState ])

  return (
    <ReduxProvider store={ store }>
      <ThemeProvider theme={ theme }>
        <ApolloAppWrapper />
      </ThemeProvider>
    </ReduxProvider>
  );
}

function ApolloAppWrapper() {
  const accessToken = useSelector<
    CombinedState,
    CombinedState[ 'app' ][ 'accessToken' ]
  >(({ app: { accessToken } }) => accessToken);

  const client = React.useMemo(() => createClient(accessToken), [ accessToken ]);

  return (
    <ApolloProvider client={ client }>
      <Router>
        <Main />
      </Router>
    </ApolloProvider>
  );
}

export default App;
