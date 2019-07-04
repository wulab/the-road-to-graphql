import React, { useState } from "react";
import classNames from "classnames";

function RepositorySelector({ initialValue, onSelect }) {
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(true);

  function handleChange(event) {
    event.preventDefault();
    setValue(event.target.value);
    setDisabled(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!disabled) {
      onSelect(value);
      setDisabled(true);
    }
  }

  return (
    <section className="topic nes-container with-title">
      <h3 className="title">Repository</h3>
      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <input
            type="text"
            className="nes-input"
            value={value}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={classNames("nes-btn", {
            "is-primary": !disabled,
            "is-disabled": disabled
          })}
        >
          Set
        </button>
      </form>
    </section>
  );
}

export default RepositorySelector;
