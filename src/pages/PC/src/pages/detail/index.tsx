import React from "react";
import { useLocation } from "react-router-dom";
import { getSearch } from "@/untiles";
import "./index.css";
const Detail = () => {
  const { type } = getSearch(useLocation());

  return (
    <>
      <h1>this is Detail Page</h1>
      <h2>{"this type is " + type}</h2>
    </>
  );
};

export default Detail;
