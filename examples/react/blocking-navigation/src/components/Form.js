import React from "react";
import { useBlock } from "@curi/react-dom";

function confirmNavigation(_, confirm, prevent) {
  const resp = window.confirm(
    "Are you sure you want to navigate? The form has not been submitted"
  );
  if (resp) {
    confirm();
  } else {
    prevent();
  }
}

function Form() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [dirty, setDirty] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  useBlock(dirty && !submitted, confirmNavigation);

  React.useEffect(() => {
    setDirty(email !== "" || message !== "");
  }, [email, message]);

  if (submitted) {
    return <div>Thanks you for contacting us!</div>;
  }

  return (
    <form>
      <p>
        <label>
          Email{" "}
          <input
            type="text"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
        </label>
      </p>
      <p>
        <label>
          Message{" "}
          <input
            type="text"
            value={message}
            onChange={event => {
              setMessage(event.target.value);
            }}
          />
        </label>
      </p>
      <button
        type="button"
        onClick={event => {
          if (email === "" || message === "") {
            return;
          }
          setSubmitted(true);
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
