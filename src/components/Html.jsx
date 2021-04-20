import React from 'react';
import PropTypes from 'prop-types';

const Html = ({
  children,
  title,
  description
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <div id="app">{children}</div>
      <script src="/static/bundle.js" />
    </body>
  </html>
);

Html.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

Html.defaultProps = {
  title: '',
  description: ''
};

export default Html;
