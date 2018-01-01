import React, { PropTypes } from 'react';

import Page from '../Page';

const Layout = (props) => {
  const title = (props.title) ? `daviddelo.com | ${props.title}` : 'daviddelo.com';
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>
      <body>
        <main id="react-main">
          <Page>
            {props.children}
          </Page>
        </main>
      </body>
    </html>
  );
};

Layout.defaultProps = {
  title: ''
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string
};

export default Layout;
