import React, { useState, useEffect } from "react";
import "./index.less";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Detail from "../detail";
import Navigate from "../../components/Navgate/index";
import BannerComponent from "@/pages/PC/src/components/BannerComponent";
import Loading from "../../components/LoadingWindows";
import { MyContext } from "@/untiles/context";
import banner from "@/pages/PC/src/components/BannerComponent/banner.png";
function App() {
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [issueFlag, setIssueFlag] = useState(false);
  const [parameterData, setParameterData] = useState([]);
  useEffect(() => {}, [showLoading]);
  return (
    <MyContext.Provider
      value={{
        count,
        setCount,
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
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/detail">
                <Detail></Detail>
              </Route>
            </Switch>
          </HashRouter>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
