import { createMemoryHistory } from 'react-router';

export default function attachApp() {
  const history = createMemoryHistory();

  return (req, res, next) => {  // eslint-disable-line consistent-return
    const location = history.createLocation(req.originalUrl);
    const { renderProps } = res.locals;

    console.log('attachApp'); // eslint-disable-line no-console

    if (!renderProps) {
      return next(new Error('Expected renderProps in res.locals. Verify that matchRoutes middleware is mounted.'));
    }

    renderProps.referrer = req.headers.referer;

    res.locals.location = location; // eslint-disable-line no-param-reassign

    // Fix?
    const app = {};
    res.locals.app = app;           // eslint-disable-line no-param-reassign

    next();
  };
}
