import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Application from '../components/Application';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';

export default function routes() {
  return (
    <Route name="application" path="/" component={Application}>
      <IndexRoute name="homepage" component={HomePage} />
      <Route name="about" path="about" component={AboutPage} />
    </Route>
  );
}
