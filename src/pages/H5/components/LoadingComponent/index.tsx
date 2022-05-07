import React from "react";
import loadingImg from "./loading.gif";
import { Loading } from "./style";

export default function LoadingWindow() {
  return (
    <Loading>
      <div className="windowBox">
        <div className="LoadingWindow">
          <img src={loadingImg} />
        </div>
      </div>
    </Loading>
  );
}
