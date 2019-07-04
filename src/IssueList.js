import React from "react";
import classNames from "classnames";

function IssueList({ issues }) {
  return (
    <section className="topic nes-container with-title">
      <h3 className="title">Issues</h3>
      {issues.map(({ id, title, url }, index) => (
        <a href={url} key={id} style={{ color: "#212529" }} target="_blank">
          <p
            className={classNames("nes-balloon", {
              "from-left": index % 2 === 0,
              "from-right": index % 2 === 1
            })}
            style={{ marginBottom: "3rem" }}
          >
            {title}
          </p>
        </a>
      ))}
    </section>
  );
}

export default IssueList;
