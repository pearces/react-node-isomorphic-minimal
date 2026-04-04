import React, { type ReactNode } from 'react';
import './Main.scss';

interface HtmlProps {
  children: ReactNode;
  title?: string;
  description?: string;
  inlineCss?: string;
  inlineScripts?: string[];
  stylesheets?: string[];
  scripts?: string[];
}

const Html = ({
  children,
  title = '',
  inlineCss,
  inlineScripts = [],
  description = '',
  stylesheets = [],
  scripts = []
}: HtmlProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {inlineCss && <style>{inlineCss}</style>}
      {stylesheets.map((stylesheet) => (
        <link rel="stylesheet" href={stylesheet} key={stylesheet} />
      ))}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      {inlineScripts.map((script, index) => (
        <script key={`inline${index}`} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </head>
    <body>
      <div id="app">{children}</div>
      {scripts.map((script) => (
        <script src={script} key={script} />
      ))}
    </body>
  </html>
);

export default Html;
