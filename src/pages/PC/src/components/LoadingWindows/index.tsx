import React from "react";
import loading from "./loading.gif";
import { Loading } from "./style";

export default function LoadingWindow(props: any) {
  return (
    <Loading>
      <div className="LoadMask">
        <div className="Load_alert_box">
          <div className="Load_alert_box_img">
            <img src={loading} alt="" />
          </div>
        </div>
      </div>
    </Loading>
  );
}
