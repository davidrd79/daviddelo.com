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

  //app.disable('x-powered-by');

  // Parse cookies we care about
  //app.use(cookieParser());

  // GZIP
  //app.use(compression());

  // Redirect unsupported browsers
  //app.use(unsupportedUserAgent({ redirectUrl: '/browser.html'} ));

  // Static file setup
  app.use(express.static(path.resolve(__dirname, '..', 'public')));

  const appRoutes = [
    matchRoutes,
    attachApp(),
    routes()
  ];

  // Routes for the main React app
  app.use('/foo', appRoutes);
  app.use('/', appRoutes);
  
  //app.use('/foo', routes);
  // app.use('/', (req, res, next) => {
  //   //console.log('/ req', req);
  //   //console.log('/ res', res);
  //   //console.log('/ next', next);
  //   console.log('Homepage');
  //   res.send('<!DOCTYPE html><html><body><h3>appRoutes default</h3></body></html>');
  // });

  // Unmatched routes
  app.use(notFound);

  // Handle 500
  app.use(errorHandler());

  return app;
}

const listener = createApp().listen(8888, function() {
  const host = listener.address().address;
  const port = listener.address().port;

  console.log('Server listening at http://%s:%s', host, port);  // eslint-disable-line
});
