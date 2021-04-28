import React from 'react';
import PropTypes from 'prop-types';

const Html = ({
  children,
  title,
  description,
  scripts
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
      {scripts.map((script) => <script src={`/static/${script}`} key={script} />)}
    </body>
  </html>
);

Html.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  scripts: PropTypes.arrayOf(PropTypes.string)
};

Html.defaultProps = {
  title: '',
  description: '',
  scripts: []
};

export default Html;
