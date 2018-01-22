import React from "react";
import Header from "./components/Header";

export default function render(response, navigation, router) {
  const { body: Body, params, data } = response;
  return (
    <div>
      <Header />
      <main>
        {!response || !response.body ? null : (
          <Body params={params} data={data} />
        )}
      </main>
    </div>
  );
}
