import React from 'react';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

describe('React Step 1 Tests', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  it('contains a TutorialHeader', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const header = screen.getByRole('banner', { name: 'Carbon Tutorial' });
    expect(header).toBeInTheDocument();
  });
});
