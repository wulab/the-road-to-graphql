import React, { useState, useEffect } from "react";
import axios from "axios";
import RepositorySelector from "./RepositorySelector";
import Dialog from "./Dialog";
import IssueList from "./IssueList";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`
  }
});

const GET_REPOSITORY_ISSUES = `
  query GetRepositoryIssues($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
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
  const [issues, setIssues] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const [organization, repository] = path.split("/");
    axiosGitHubGraphQL
      .post("", {
        query: GET_REPOSITORY_ISSUES,
        variables: { organization, repository }
      })
      .then(response => {
        if (response.data.errors) {
          setErrors(response.data.errors);
          throw new Error("Something went wrong");
        }
        const repository = response.data.data.organization.repository;
        const issues = repository.issues.edges.map(obj => obj.node);
        setIssues(issues);
      })
      .catch(error => console.error(error.message));
  }, [path]);

  function handleSelect(value) {
    setIssues(null);
    setPath(value);
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
        <Dialog title="Issues" description="Loading..." />
      )}
      {issues === null && errors !== null && (
        <Dialog
          title="Error"
          description={errors.map(error => error.message).join(" ")}
        />
      )}
      {issues !== null && <IssueList issues={issues} />}
    </div>
  );
}

export default App;
