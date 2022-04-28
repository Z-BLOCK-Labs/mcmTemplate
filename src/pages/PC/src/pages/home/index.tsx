import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import qs from "qs";
const HomeStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1072px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Home = () => {
  return (
    <HomeStyle>
      <h1>this is Home Page</h1>
      <Link
        to={{ pathname: "/detail", search: qs.stringify({ type: "demo" }) }}
      >
        <button>click to detail </button>
      </Link>
    </HomeStyle>
  );
};

export default Home;
