import React, { useState } from "react";
import axios from "axios";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`
  }
});

function App() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    event.preventDefault();
    setPath(event.target.value);
  }

  return (
    <div className="container">
      <section className="topic">
        <h2>
          <a href="#title">#</a> React GraphQL GitHub Client
        </h2>
      </section>
      <section className="nes-container with-title">
        <h3 className="title">Repository</h3>
        <form onSubmit={handleSubmit}>
          <div className="nes-field">
            <input
              type="text"
              className="nes-input"
              value={path}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="nes-btn is-primary">
            Update
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
