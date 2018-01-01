import compression from 'compression';
import express from 'express';
import path from 'path';

// Internal
import ROUTES from './routes';
import serverSideRenderer from './middleware/serverSideRenderer';
import unsupportedUserAgent from './middleware/unsupportedUserAgent';
import { errorHandler, notFound } from './middleware/errorHandlers';

const createApp = () => {
  const app = express();

  // app.locals.title = 'daviddelo.com';
  // app.locals.email = 'dave@daviddelo.com';

  app.disable('x-powered-by');

  // GZIP
  app.use(compression());

  // Static file setup
  app.use(express.static(path.resolve(__dirname, '..', 'public')));

  // Redirect unsupported browsers
  app.use(unsupportedUserAgent({ redirectUrl: '/browser.html' }));

  // Routes
  app.use(ROUTES.resume.path, serverSideRenderer('resume'));
  app.use(ROUTES.about.path, serverSideRenderer('about'));
  app.use(ROUTES.home.path, serverSideRenderer('home'));

  // Unmatched routes
  app.use(notFound);

  // Handle 500
  app.use(errorHandler());

  return app;
};

const listener = createApp().listen(8080, () => {
  const { host, port } = listener.address();
  console.log('Server listening at http://%s:%s', host, port);  // eslint-disable-line
});
