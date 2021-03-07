import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import CredentialsReducer from './ReduxStore/reducers/credentials';
import ChoiceReducer from './ReduxStore/reducers/choice';
import PasswordReducer from './ReduxStore/reducers/passwordResetter';
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {PersistGate} from "redux-persist/integration/react"

axios.defaults.baseURL="https://localhost:8443/";
if(localStorage.getItem('jwt') !== null)
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('jwt');
axios.defaults.httpsAgent ={ rejectUnauthorized: false }


const rootReducer = combineReducers({
    credentialsReducer: CredentialsReducer,
    choiceReducer: ChoiceReducer,
    passwordReducer: PasswordReducer});

const persistConfig =  {
    key: 'root',
    storage,
    whitelist: ['credentialsReducer']
}

const store = createStore(persistReducer(persistConfig,rootReducer));

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                  <App />
              </PersistGate>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
