import React, { PropTypes } from 'react';

import Navigation from '../Navigation';
import Footer from '../Footer';

const Page = props =>
  (
    [
      <Navigation />,
      props.children,
      <Footer />
    ]
  );

Page.propTypes = {
  children: PropTypes.element.isRequired
};

export default Page;
