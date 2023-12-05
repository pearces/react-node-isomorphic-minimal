import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../ThemeContext';
import { THEMES } from '../../constants';

const { LIGHT, DARK } = THEMES;
describe('ThemeContext', () => {
  it('should render the default theme', () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>{({ theme }) => <div>{theme}</div>}</ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(getByText(LIGHT)).toBeTruthy();
  });

  it('should toggle the theme to dark', async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <div>{theme}</div>
              <button onClick={toggleTheme} type="button">
                Toggle Theme
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const toggleButton = getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    expect(getByText(DARK)).toBeTruthy();
  });

  it('should toggle the theme back to light on second toggle', async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <div>{theme}</div>
              <button onClick={toggleTheme} type="button">
                Toggle Theme
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const toggleButton = getByText('Toggle Theme');
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    expect(getByText(LIGHT)).toBeTruthy();
  });
});
