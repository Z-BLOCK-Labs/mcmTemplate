import React from "react";
import "./index.less";
import logo from "../../assets/pc-img/LOGO@2x.png";
import useWallet from "@/hooks/useWallet";
import { filter } from "@/untiles";

const Index = () => {
  const [address, getAccount] = useWallet();
  return (
    <div className="line">
      <div className="top">
        <div className="top_box">
          <div className="top_box_logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="top_box_content">
          <a href="">Pool</a>
        </div>
        <div className="contect_btn">
          <button onClick={getAccount}>
            {address === "" ? "Connect" : filter(address)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
