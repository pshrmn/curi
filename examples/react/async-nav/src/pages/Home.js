import React from "react";
import { Link } from "@curi/react";
import Spinner from "react-spinkit";

const styles = {
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

const Home = ({ response }) => (
  <div style={styles.container}>
    {response.data.map(movie => (
      <Link
        to="Movie"
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
      </Link>
    ))}
  </div>
);

export default Home;
