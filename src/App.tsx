import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from './apollo';
import './App.css';


function App() {
  return (
    <ApolloProvider client={ client }>
      <div className="App">Hello to slender github explorer</div>
    </ApolloProvider>
  );
}

export default App;
