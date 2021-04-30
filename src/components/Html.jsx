import React from 'react';
import PropTypes from 'prop-types';

const Html = ({
  children,
  title,
  description,
  stylesheets,
  scripts
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {stylesheets.map((stylesheet) => <link rel="stylesheet" href={`/static/${stylesheet}`} key={stylesheet} />)}
    </head>
    <body>
      <div id="app">{children}</div>
      {scripts.map((script) => <script src={`/static/${script}`} key={script} />)}
    </body>
  </html>
);

Html.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  stylesheets: PropTypes.arrayOf(PropTypes.string),
  scripts: PropTypes.arrayOf(PropTypes.string)
};

Html.defaultProps = {
  title: '',
  description: '',
  stylesheets: [],
  scripts: []
};

export default Html;
