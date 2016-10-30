import path from 'path';
import { NotFoundError } from '../util/errors';

// Use after all routes are mounted.
// Catches unmatched routes and forward to error handling.
export function notFound(req, res, next) {
  next(new NotFoundError(), req, res);
}

export function errorHandler() {
  return (err, req, res, next) => { // eslint-disable-line consistent-return
    if (!err) {
      return next(err, req, res);
    }

    console.error(err.stack); // eslint-disable-line no-console

    const status = err.status || 500;
    const htmlFile = status === 404 ? '404.html' : '500.html';
    const options = {
      root: path.resolve(__dirname, '../..', 'public')
    };
    res.status(status)
      .sendFile(htmlFile, options);
  };
}
