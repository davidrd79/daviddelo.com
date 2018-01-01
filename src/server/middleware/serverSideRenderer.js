/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOMServer from 'react-dom';

// Internal
import ROUTES from '../routes';
import Layout from '../../components/Layout';

export default function serverSideRenderer(route) {
  return (req, res, next) => {
    const component = ROUTES[route];
    if (component) {
      const { title, component: pageComponent } = component;
      const layoutMarkup = (
        <Layout
          title={title}
        >
          {pageComponent}
        </Layout>
      );
      const markup = ReactDOMServer.renderToStaticMarkup(layoutMarkup);
      res.send(markup);
    }

    next();
  };
}
