import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from './App';
import RepoPage from './content/RepoPage/RepoPage';
import LandingPage from './content/LandingPage';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

const REPO_QUERY = gql`
  query REPO_QUERY {
    organization(login: "carbon-design-system") {
      repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          url
          homepageUrl
          issues(filterBy: { states: OPEN }) {
            totalCount
          }
          stargazers {
            totalCount
          }
          releases(first: 1) {
            totalCount
            nodes {
              name
            }
          }
          name
          updatedAt
          createdAt
          description
          id
        }
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: REPO_QUERY,
    },
    result: {
      data: {
        organization: {
          repositories: {
            totalCount: 1,
            nodes: [
              {
                url: 'https://github.com/carbon-design-system/carbon',
                homepageUrl: 'https://www.carbondesignsystem.com',
                issues: { totalCount: 357, __typename: 'IssueConnection' },
                stargazers: {
                  totalCount: 3054,
                  __typename: 'StargazerConnection',
                },
                releases: {
                  totalCount: 640,
                  nodes: [{ name: '7.0.0-rc.1', __typename: 'Release' }],
                  __typename: 'ReleaseConnection',
                },
                name: 'carbon',
                updatedAt: '2020-05-27T18:55:53Z',
                createdAt: '2017-03-13T14:23:59Z',
                description: 'A design system built by IBM',
                id: 'MDEwOlJlcG9zaXRvcnk4NDgzNTUzNQ==',
                __typename: 'Repository',
              },
            ],
          },
        },
      },
    },
    maxUsageCount: 2,
  },
]; // for Appolo

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

describe('React Step 2&3 Tests', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoPage />
      </MockedProvider>
    );
    render(<LandingPage />);
  });

  it('RepoPage contains a RepoTable', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoPage />
      </MockedProvider>
    );
    expect(
      await screen.findByRole('heading', { name: 'Carbon Repositories' })
    ).toBeInTheDocument();
    expect(await screen.findByRole('table')).toBeInTheDocument();
    const expectedNameCellValue =
      mocks[0].result.data.organization.repositories.nodes[0].name;
    expect(
      await screen.findByRole('cell', { name: expectedNameCellValue })
    ).toBeInTheDocument();
  });

  it('RepoPage contains Pagination', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoPage />
      </MockedProvider>
    );
    expect(await screen.findByText('Items per page')).toBeVisible();
  });
});
