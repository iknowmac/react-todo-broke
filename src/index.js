
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { teal, lightGreen, red } from '@material-ui/core/colors';

import Todos from './containers/Todo';
import configureStore from './redux/store';

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider
      theme={createMuiTheme({
        typography: {
          useNextVariants: true,
        },
        palette: {
          type: 'light',
          primary: teal,
          secondary: lightGreen,
          error: red
        }
      })}
    >
      <Todos />
    </ThemeProvider>
  </Provider>
, document.getElementById('root'));

registerServiceWorker();
