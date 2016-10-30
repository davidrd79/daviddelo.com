import React from 'react';

import Navigation from '../Navigation';
import Footer from '../Footer';

const Application = props =>
  <div>
    <Navigation />
    {props.children}
    <Footer />
  </div>;

Application.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Application;
