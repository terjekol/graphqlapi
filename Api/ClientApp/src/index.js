import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: '/graphql',
});

// client.query({
//   query: gql`
//     {
//       author(id: 1) {
//         name
//       }
//     }
//     `
// })
//   .then(result => console.log(result))
//   .catch(error => console.error(error));

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  rootElement);

registerServiceWorker();
