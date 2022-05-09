import React, { useContext, useEffect, useState } from "react";
import "../styles/Navigator.css";
import Logo from "../../../static/img/LOGO@2x.png";
import menueImg from "../../../static/img/menue.png";
import closeImg from "../../../static/img/close.png";
import { filter } from "@/untiles";
import { ConnectButton } from "@/pages/H5/src/components/WalletComponent/style";
import useWallet from "@/hooks/useWallet";
import { MyContext } from "@/untiles/context";
import { Toast } from "antd-mobile";

function Navigator() {
  const [menueFlag, setMenueFlag] = useState("none");
  const Context = useContext(MyContext);

  function handleClick() {
    setMenueFlag("block");
  }
  function handleClose() {
    setMenueFlag("none");
  }
  const [address, getAccount] = useWallet();
  useEffect(() => {
    if (Context.walletError !== null) {
      Toast.show(Context.walletError);
    }
  }, [Context.walletError]);

  return (
    <div>
      <nav className="flexBox">
        <div className="box1">
          <img src={Logo} alt="Aggregator" />
        </div>
        <div
          style={{
            display: menueFlag === "block" ? "none" : "block",
          }}
        >
          <ConnectButton onClick={getAccount}>
            {address === "" ? "Connect" : filter(address)}
          </ConnectButton>
        </div>
        <label htmlFor="check" className="check-in">
          <div
            className="menue flexBox"
            onClick={handleClick}
            style={{
              display: menueFlag === "block" ? "none" : "flex",
            }}
          >
            <img src={menueImg} />
          </div>
        </label>
        <label
          htmlFor="check"
          className="check-out"
          style={{ display: menueFlag }}
          onClick={handleClose}
        >
          <div className="flexBox">
            <img src={closeImg} className="CloseMenue" />
          </div>
        </label>
      </nav>
      <div className="box">
        <input id="check" type="checkbox" />
        <div className="element">
          <ul>
            <li>
              <a href="#">Pool</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navigator;
