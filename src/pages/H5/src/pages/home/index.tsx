import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";

const Home = () => {
  return (
    <>
      <h1>this is Home Page</h1>
      <Link
        to={{ pathname: "/detail", search: qs.stringify({ type: "demo" }) }}
      >
        <button>click to detail </button>
      </Link>
    </>
  );
};

export default Home;
