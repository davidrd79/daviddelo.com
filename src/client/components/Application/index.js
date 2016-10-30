import React, { PropTypes } from 'react';

import Navigation from '../Navigation';
import Footer from '../Footer';

const Application = props =>
  <div>
    <Navigation />
    {props.children}
    <Footer />
  </div>;

Application.propTypes = {
  children: PropTypes.element.isRequired
};

export default Application;
