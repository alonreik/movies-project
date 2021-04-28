import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchComponent from './SearchHandlingComponent';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import createStore from "./Redux"

// dev toools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store.
let store = createStore()

// todo - should add a container between the providers tags.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
