import { createMemoryHistory } from 'react-router';

export default function attachApp() {
  const history = createMemoryHistory();

  return function(req, res, next) {
    let location = history.createLocation(req.originalUrl);
    const { renderProps } = res.locals;

    console.log('attachApp');

    if (!renderProps) {
      return next(new Error('Expected renderProps in res.locals. Verify that matchRoutes middleware is mounted.'));
    }

    renderProps.referrer = req.headers.referer;

    res.locals.location = location;

    // Fix?
    const app = {};
    res.locals.app = app;

    next();
  };
}
