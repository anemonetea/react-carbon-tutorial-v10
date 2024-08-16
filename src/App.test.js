import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from './App';
import RepoPage from './content/RepoPage/RepoPage';
import LandingPage from './content/LandingPage';

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

describe('React Step 2 Tests', () => {
  it('renders without crashing', () => {
    render(<RepoPage />);
    render(<LandingPage />);
  });

  it('RepoPage contains a RepoTable', () => {
    render(<RepoPage />);
    expect(
      screen.getByRole('heading', { name: 'Carbon Repositories' })
    ).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Repo 1' })).toBeInTheDocument();
  });
});
