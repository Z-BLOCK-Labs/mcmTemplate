import React, { useState, useEffect } from "react";
import "./index.less";
import { HashRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routesConfig from "../../routeConfig";
import Navigate from "../../components/Navgate/index";
import BannerComponent from "@/pages/PC/src/components/BannerComponent";
import Loading from "../../components/LoadingWindows";
import { MyContext } from "@/untiles/context";
import banner from "@/pages/PC/src/components/BannerComponent/banner.png";
function App() {
  const [address, setAddress] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [issueFlag, setIssueFlag] = useState(false);
  const [parameterData, setParameterData] = useState([]);
  useEffect(() => {}, [showLoading]);
  return (
    <MyContext.Provider
      value={{
        address,
        setAddress,
        showLoading,
        setShowLoading,
        issueFlag,
        setIssueFlag,
        parameterData,
        setParameterData,
      }}
    >
      <div className="main">
        <Navigate></Navigate>

        <div className="main_area">
          {showLoading ? <Loading></Loading> : null}
          <BannerComponent
            imgSrc={banner}
            title={"AFK Pools"}
            titleContent={"Stake your AFK get, veAFK at 1:1 and earn rewards."}
            boxContent={"AFK Pools"}
          ></BannerComponent>
          <HashRouter>
            <Switch>{renderRoutes(routesConfig)}</Switch>
          </HashRouter>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
