import { match, createMemoryHistory } from 'react-router';
import { NotFoundError } from '../util/errors';
import routes from '../../client/routes';

const history = createMemoryHistory();

export default function matchRoutes(req, res, next) {
  let { location } = res.locals;
  if (!location) {
    location = history.createLocation(req.originalUrl);
  }

  match({ history, routes: routes(), location }, (error, redirectLocation, renderProps) => {
    if (error) {
      return next(error);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      return next(new NotFoundError(`State from Router is Null - No matching route for -  ${req.originalUrl}`));
    }

    renderProps.locationUrl = req.originalUrl;
    res.locals.renderProps = renderProps;
    next();
  });
}
