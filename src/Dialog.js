import React from "react";

function Dialog({ title, description }) {
  return (
    <section className="topic nes-container with-title">
      <h3 className="title">{title}</h3>
      <p>{description}</p>
    </section>
  );
}

export default Dialog;
