import React from "react";
import classNames from "classnames";

function IssueList({ issues, onNextClick }) {
  function handleClick(event) {
    event.preventDefault();
    onNextClick();
  }

  return (
    <section
      className="topic nes-container with-title"
      style={{ backgroundColor: "#d3d3d3" }}
    >
      <h3 className="title">Top issues</h3>
      {issues.map(({ id, title, url }, index) => {
        const direction = index % 2 === 0 ? "right" : "left";
        return (
          <a
            href={url}
            key={id}
            style={{ color: "#212529" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p
              className={classNames("nes-balloon", {
                [`from-${direction}`]: true
              })}
              style={{
                clear: "both",
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
      <button type="button" onClick={handleClick} class="nes-btn is-primary">
        Next>
      </button>
    </section>
  );
}

export default IssueList;
