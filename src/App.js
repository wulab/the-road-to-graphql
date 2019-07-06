import React, { useState, useEffect } from "react";
import axios from "axios";
import RepositorySelector from "./RepositorySelector";
import Dialog from "./Dialog";
import IssueList from "./IssueList";

const token = prompt(
  "GitHub Personal Access Token",
  process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
);

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${token}`
  }
});

const GET_REPOSITORY_ISSUES = `
  query GetRepositoryIssues($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(first: 3, after: $cursor, orderBy: { field: COMMENTS, direction: DESC }) {
          edges {
            node {
              id
              title
              url
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

function App() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );
  const [cursor, setCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [issues, setIssues] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const [organization, repository] = path.split("/");
    axiosGitHubGraphQL
      .post("", {
        query: GET_REPOSITORY_ISSUES,
        variables: { organization, repository, cursor }
      })
      .then(response => {
        if (response.data.errors) {
          setErrors(response.data.errors);
          throw new Error("Something went wrong");
        }
        const repository = response.data.data.organization.repository;
        setIssues(repository.issues.edges.map(obj => obj.node));
        const { endCursor, hasNextPage } = repository.issues.pageInfo;
        setEndCursor(hasNextPage ? endCursor : null);
      })
      .catch(error => console.error(error.message));
  }, [path, cursor]);

  function handleSelect(value) {
    setIssues(null);
    setPath(value);
  }

  function handleNextClick() {
    setIssues(null);
    setCursor(endCursor);
  }

  return (
    <div className="container">
      <section className="topic">
        <h2>
          <a href="#title">#</a> React GraphQL GitHub Client
        </h2>
      </section>
      <RepositorySelector initialValue={path} onSelect={handleSelect} />
      {issues === null && errors === null && (
        <Dialog title="Top issues" description="Loading..." />
      )}
      {issues === null && errors !== null && (
        <Dialog
          title="Error"
          description={errors.map(error => error.message).join(" ")}
        />
      )}
      {issues !== null && (
        <IssueList issues={issues} onNextClick={handleNextClick} />
      )}
    </div>
  );
}

export default App;
