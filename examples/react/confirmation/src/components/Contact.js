import React from "react";
import { useConfirm } from "@curi/react-dom";

function confirmation(_, accept, reject) {
  let answer = window.confirm("Are you sure that you want to navigate away?");
  if (answer) {
    accept();
  } else {
    reject();
  }
}

function useBeforeUnload(confirm) {
  React.useEffect(() => {
    if (!confirm) {
      return;
    }

    let confirmation = event => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", confirmation, false);

    return () => {
      window.removeEventListener("beforeunload", confirmation);
    };
  }, [confirm]);
}

let Contact = () => {
  let [email, setEmail] = React.useState("");
  let [msg, setMsg] = React.useState("");
  let dirty = email !== "" || msg !== "";

  useConfirm(dirty ? confirmation : undefined);
  useBeforeUnload(dirty);

  return (
    <div>
      <form>
        <label>
          Email:{" "}
          <input
            value={email}
            onChange={e => {
              setEmail(e.currentTarget.value);
            }}
          />
        </label>
        <label>
          Meseage:{" "}
          <input
            value={msg}
            onChange={e => {
              setMsg(e.currentTarget.value);
            }}
          />
        </label>
      </form>
    </div>
  );
};

export default Contact;
