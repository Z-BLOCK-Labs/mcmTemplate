import React, { useState } from "react";
import { HashRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routesConfig from "../../routeConfig ";
import Navigator from "./mods/Navigator";
import "./index.css";
import { MyContext } from "@/untiles/context";
import BannerComponent from "../../components/BannerComponent";
import banner from "@/pages/H5/src/components/BannerComponent/banner.png";
function App() {
  const [address, setAddress] = useState("");
  const [issueFlag, setIssueFlag] = useState(false);
  const [parameterData, setParameterData] = useState([]);
  const [walletError, setWalletError] = useState(null);
  return (
    <MyContext.Provider
      value={{
        address,
        setAddress,
        issueFlag,
        setIssueFlag,
        parameterData,
        setParameterData,
        walletError,
        setWalletError,
      }}
    >
      <div className="App">
        <Navigator />
        <BannerComponent
          imgSrc={banner}
          title={"AFK Pools"}
          titleContent={"Stake your AFK get, veAFK at 1:1 and earn rewards."}
          boxContent={"AFK Pools"}
        />
        <HashRouter>
          <Switch>{renderRoutes(routesConfig)}</Switch>
        </HashRouter>
      </div>
    </MyContext.Provider>
  );
}

export default App;
