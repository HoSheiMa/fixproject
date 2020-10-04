/**
 * @format
 */

import React from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/store';

// ignore specific yellowbox warnings
YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);
YellowBox.ignoreWarnings(['Setting a timer']);

const store = configureStore()

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);





