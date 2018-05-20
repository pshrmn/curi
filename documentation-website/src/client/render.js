import React from "react";
import Header from "./components/Header";

// import "./scss/index.scss";
// import "./scss/main.scss";

export default function render({ response }) {
  const { body: Body, params, data } = response;
  return (
    <React.Fragment>
      <Header />
      <main>
        {!response || !response.body ? null : (
          <Body params={params} data={data} />
        )}
      </main>
    </React.Fragment>
  );
}
