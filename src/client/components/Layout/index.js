import React, { PropTypes } from 'react';

/*
const ChunkManifest = ({ chunks }) => (
  <script type="text/javascript"
    dangerouslySetInnerHTML={{__html: `window.__WEBPACK_MANIFEST__=${JSON.stringify(chunks)}`}}>
  </script>
);

const createScriptTag = (path, index) => {
  if (!path) { return ''; }
  return <script key={`script-${index}`} type="text/javascript" defer src={ path }></script>;
};

const createStyleTag = (path, index) => {
  return <link key={`style-${index}`} rel="stylesheet" type="text/css" href={ path } />;
};

const title = () => {
  if (typeof this.props.title.toComponent === 'function') {
    return this.props.title.toComponent();
  }
  return <title>{ this.props.title }</title>;
};

const metaTags = () => {
  if (this.props.metaTags && typeof this.props.metaTags.toComponent === 'function') {
    return this.props.metaTags.toComponent();
  }
};

const linkTags = () => {
  if (this.props.linkTags && typeof this.props.linkTags.toComponent === 'function') {
    return this.props.linkTags.toComponent();
  }
};
{linkTags.call(this)}
*/

const Layout = props =>
  <html lang="en">
    <head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    </head>
    <body>
      <div
        id="react-main-mount"
        dangerouslySetInnerHTML={{ __html: props.markup }}
      />
    </body>
  </html>;

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  markup: PropTypes.string.isRequired
};
// chunkManifest: PropTypes.object.isRequired

Layout.defaultProps = {
  title: '',
  markup: ''
};

export default Layout;
