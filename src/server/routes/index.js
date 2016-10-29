import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { RouterContext } from 'react-router';

import Layout from '../../client/components/Layout';



//import { ApplicationContainer } from 'marty';
//import { omit } from 'lodash';
//import { Provider } from 'react-redux';
//import { RouterContext } from 'react-router';
//import intializeReduxStore from '../../common/Redux';
//import prefetch from '../../server/utils/prefetch';
//import Layout from '../../client/shop/components/layout/Layout';
//import rollbar from '../../common/utils/rollbar';
//import ServerConfig from '../../config';
//import { I18nProvider } from '../../common/utils/I18nProvider';

//const SHOP_STYLES = ['account', 'blog', 'checkout', 'cleanout', 'shop'];
//const REVIEW_STYLES = ['cleanout', 'product_review'];

//export default function appRoutes({ revManifest, chunkManifest }) {

/*
--- REDUX ---
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import config from '../config';
import reducers from '../client/reducers';

const intializeReduxStore = (state = {}) => {
  const middleware = [thunkMiddleware];
  const composeEnhancers = config.isDevelopment() && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  return createStore(reducers, state, composeEnhancers(
    applyMiddleware(...middleware)
  ));
};
--- REDUX ---
*/

export default function routes() {
  //const shopStylePaths = ServerConfig.assetPaths(SHOP_STYLES, revManifest, 'css');
  //const reviewsStylePaths = ServerConfig.assetPaths(REVIEW_STYLES, revManifest, 'css');

  //const stylePaths = (baseUrl) => baseUrl === '/productreviews' ? reviewsStylePaths : shopStylePaths;
  //const scriptPaths = ServerConfig.assetPaths(['vendor', 'shop'], revManifest, 'js');

  return function(req, res, next) {
    const { app, renderProps } = res.locals;

    console.log('appRoutes');
    console.log('appRoutes app', app);

    if (!app) {
      return next(new Error('Expected app in res.locals. Verify that attachApp middleware is mounted.'));
    }

    if (!renderProps) {
      return next(new Error('Expected renderProps in res.locals. Verify that matchRoutes middleware is mounted.'));
    }


    const appBootstrapJSX = (
      <RouterContext {...renderProps} />
    );

    const appMarkup = ReactDOMServer.renderToString(appBootstrapJSX);
    console.log('appRoutes appMarkup', appMarkup, typeof(appMarkup));

    const head = Helmet.rewind() || {};
    const layoutMarkup = ReactDOMServer.renderToStaticMarkup(
      <Layout
        title={'daviddelo.com'}
        markup={appMarkup} />
    );

    console.log('appRoutes layoutMarkup', layoutMarkup);
    res.send('<!DOCTYPE html>' + layoutMarkup);

    // Redux store data
    //const store = intializeReduxStore({ });

    /*
    function createComponentWithStore() {
      // Now the prefetch has completed
      const state = store.getState();

      const appBootstrapJSX = (
        <Provider store={ store }>
          <I18nProvider i18n={i18n}>
            <ApplicationContainer app={app}>
              <RouterContext {...renderProps} radiumConfig={ userAgent } />
            </ApplicationContainer>
          </I18nProvider>
        </Provider>
      );

      app.renderToString(appBootstrapJSX, {timeout: 5000}).then(render => {
        const head = Helmet.rewind() || {};
        return ReactDOMServer.renderToStaticMarkup(
          <Layout chunkManifest={chunkManifest}
            cookies={{ pixelCookie }}
            i18n={i18n}
            linkTags= { head.link }
            markup={`<div>${render.html}</div>`}
            metaTags={ head.meta }
            scriptPaths={ scriptPaths }
            state={ state }
            stylePaths={ stylePaths(req.baseUrl) }
            title={ head.title || 'thredUP - The Largest Online Consignment & Thrift Store' }
            user={ state.currentUser }
            utag_data={ utagData() } />
        );
      }).then(html => {
        // console.timeEnd('renderToString');
        const pageData = '<!DOCTYPE html>' + html;
        if (req.cachePage) req.cachePage(pageData);
        res.send(pageData);
      }).catch(next);
    }

    // First we need to prefetch any of our redux data based on `readyOnActions` in
    // each of our `router level` components
    prefetch(renderProps, store)
      .then(() => createComponentWithStore())
      .catch(error => rollbar.error('Redux: Prefetch error', error));
    */
  };
}
