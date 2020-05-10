import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';

import client from './apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">Hello to slender github explorer</div>
    </ApolloProvider>
  );
}

export default App;
