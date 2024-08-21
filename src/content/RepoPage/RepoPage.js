import React from 'react';
import RepoTable from './RepoTable';
import { headers, rows } from './data';
import { useQuery, gql } from '@apollo/client';
import { DataTableSkeleton, InlineNotification } from 'carbon-components-react';
import { getRowItems } from './helper';

const REPO_QUERY = gql`
  query REPO_QUERY {
    # Let's use carbon as our organization
    organization(login: "carbon-design-system") {
      # We'll grab all the repositories in one go. To load more resources
      # continuously, see the advanced topics.
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

const RepoPage = () => {
  const { loading, error, data } = useQuery(REPO_QUERY);

  let content = <></>;
  if (loading) {
    content = (
      <DataTableSkeleton
        columnCount={headers.length + 1}
        rowCount={10}
        headers={headers}
      />
    );
  }
  if (error) {
    content = (
      <>
        <InlineNotification
          title="Error fetching repositories from GitHub."
          subtitle={error.message}
          kind="error"
          lowContrast
        />
        <RepoTable headers={headers} rows={rows} />
      </>
    );
  }
  if (data) {
    // If we're here, we've got our data!
    console.log(data);
    // Destructure the data:
    const { repositories } = data.organization;
    const rows = getRowItems(repositories.nodes);

    content = (
      <>
        <RepoTable
          headers={headers}
          rows={rows}
          totalItemsCount={repositories.totalCount}
        />
      </>
    );
  }

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
      <div className="bx--row repo-page__r1">
        <div className="bx--col-lg-16">{content}</div>
      </div>
    </div>
  );
};

export default RepoPage;
