import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import unsupportedUserAgent from './middleware/unsupportedUserAgent';
import routes from './routes';
import matchRoutes from './middleware/matchRoutes';
import { errorHandler, notFound } from './middleware/errorHandlers';
import attachApp from './middleware/attachApp';

const createApp = () => {
  const app = express();

  app.locals.title = 'daviddelo.com';
  app.locals.email = 'dave@daviddelo.com';

  app.disable('x-powered-by');

  // Parse cookies we care about
  app.use(cookieParser());

  // GZIP
  app.use(compression());

  // Static file setup
  app.use(express.static(path.resolve(__dirname, '..', 'public')));

  // Redirect unsupported browsers
  app.use(unsupportedUserAgent({ redirectUrl: '/browser.html' }));

  const appRoutes = [
    matchRoutes,
    attachApp(),
    routes()
  ];

  // Routes for the main React app
  app.use('/about', appRoutes);
  app.use('/', appRoutes);

  // Unmatched routes
  app.use(notFound);

  // Handle 500
  app.use(errorHandler());

  return app;
};

const listener = createApp().listen(8888, () => {
  const host = listener.address().address;
  const port = listener.address().port;

  console.log('Server listening at http://%s:%s', host, port);  // eslint-disable-line
});
