import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Polyfills
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.array.fill';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.string.trim';
import 'core-js/modules/es7.object.values';

const gh_token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${gh_token}`,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
    {/* <RepoPage></RepoPage> */}
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
