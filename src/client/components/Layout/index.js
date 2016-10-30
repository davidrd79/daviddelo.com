import React from 'react';

const Layout = props =>
  <html lang="en">
    <head>
      <title>{props.title}</title>
    </head>
    <body>
      <div
        id="react-main-mount"
        dangerouslySetInnerHTML={{ __html: props.markup }}
      />
    </body>
  </html>;

Layout.propTypes = {
  title: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string.isRequired
};

Layout.defaultProps = {
  title: '',
  markup: ''
};

export default Layout;
