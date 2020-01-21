import React from "react";
import { AsyncLink } from "@curi/react-dom";
import Spinner from "react-spinkit";

let styles = {
  container: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  link: {
    background: "#efefef",
    color: "#444",
    margin: "5px 0",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "5px",
    borderRadius: "5px",
    height: "30px",
    width: "250px"
  }
};

let Home = ({ response }) => (
  <div style={styles.container}>
    {response.data.map(movie => (
      <AsyncLink
        name="Movie"
        params={{ id: movie.id }}
        key={movie.id}
        style={styles.link}
      >
        {navigating => (
          <React.Fragment>
            {movie.title}
            {/* use the navigating state to render a spinner while the link is navigating */
            navigating ? (
              <Spinner
                name="circle"
                fadeIn="none"
                style={{ display: "inline-block" }}
              />
            ) : null}
          </React.Fragment>
        )}
      </AsyncLink>
    ))}
  </div>
);

export default Home;
