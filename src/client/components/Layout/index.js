import React from 'react';

const Layout = (props) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
      <body>
        <div id="react-main-mount" dangerouslySetInnerHTML={{__html: props.markup}}></div>
      </body>
    </html>
  );
};

export default Layout;
