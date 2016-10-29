import React from 'react';
import { IndexRoute, Route } from 'react-router';

const Testing = () => {
  return (
    <div id="homepage">
      <h1>Homepage</h1>
    </div>
  );
};

const Foo = () => {
  return (
    <div id="foo">
      <h1>Foo</h1>
    </div>
  );
};

export default function routes() {
  return (
    <Route name="homepage" path="/" component={Testing}>
      <Route name="foo" path="foo" component={Foo} />
    </Route>
  );
}
