import 'babel-polyfill';
import 'isomorphic-fetch';
import { render } from 'react-dom';
import perfAddons from 'react-addons-perf';

import router from './router';

global.window.Perf = perfAddons;

render(
  router(),
  global.document.getElementById('react-main-mount')
);
