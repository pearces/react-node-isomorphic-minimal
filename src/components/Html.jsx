import React from 'react';
import PropTypes from 'prop-types';
import './Main.scss';

const Html = ({
  children,
  title,
  inlineCss,
  inlineScripts,
  description,
  stylesheets,
  scripts
}) => (
  /* eslint-disable react/no-danger, react/no-array-index-key */
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {inlineCss && <style>{inlineCss}</style>}
      {stylesheets.map((stylesheet) => <link rel="stylesheet" href={stylesheet} key={stylesheet} />)}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      {inlineScripts.map((script, index) => <script key={`inline${index}`} dangerouslySetInnerHTML={{ __html: script }} />)}
    </head>
    <body>
      <div id="app">{children}</div>
      {scripts.map((script) => <script src={script} key={script} />)}
    </body>
  </html>
);

Html.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  inlineCss: PropTypes.string,
  inlineScripts: PropTypes.arrayOf(PropTypes.string),
  stylesheets: PropTypes.arrayOf(PropTypes.string),
  scripts: PropTypes.arrayOf(PropTypes.string)
};

Html.defaultProps = {
  title: '',
  inlineCss: undefined,
  inlineScripts: [],
  description: '',
  stylesheets: [],
  scripts: []
};

export default Html;
