import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import CredentialsReducer from './store/reducers/credentials';
import ChoiceReducer from './store/reducers/choice';
import {BrowserRouter} from "react-router-dom";


const rootReducer = combineReducers({
    credentialsReducer: CredentialsReducer,
    choiceReducer: ChoiceReducer });
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
