import React from "react";
import { css } from "emotion";

import Header from "./components/Header";
import STYLES from "./constants/styles";

const main = css(`
width: calc(100vw - 20px);
padding: 10px 10px 0;
margin-bottom: 20px;

a {
  color: ${STYLES.purple};
}

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  padding: 50px 25px 0;
}
`);

export default function render({ response }) {
  const { body: Body, params, data } = response;
  return (
    <React.Fragment>
      <Header />
      <main className={main}>
        {!response || !response.body ? null : (
          <Body params={params} data={data} />
        )}
      </main>
    </React.Fragment>
  );
}
