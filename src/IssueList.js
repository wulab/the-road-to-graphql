import React from "react";
import classNames from "classnames";

function IssueList({ issues }) {
  return (
    <section
      className="topic nes-container with-title"
      style={{ paddingBottom: 0 }}
    >
      <h3 className="title">Issues</h3>
      {issues.map(({ id, title, url }, index) => {
        const direction = index % 2 === 0 ? "left" : "right";
        return (
          <a href={url} key={id} style={{ color: "#212529" }} target="_blank">
            <p
              className={classNames("nes-balloon", {
                [`from-${direction}`]: true
              })}
              style={{
                float: direction,
                marginBottom: "3rem",
                textAlign: direction
              }}
            >
              {title}
            </p>
          </a>
        );
      })}
      <div style={{ clear: "both" }} />
    </section>
  );
}

export default IssueList;
