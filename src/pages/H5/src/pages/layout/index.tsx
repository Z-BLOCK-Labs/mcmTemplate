import React, { useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigator from "./mods/Navigator";
import "./index.css";
import Home from "../Home";
import Detail from "../detail";
import { MyContext } from "@/untiles/context";
import BannerComponent from "../../components/BannerComponent";
import banner from "@/pages/H5/src/components/BannerComponent/banner.png";
function App() {
  const [address, setAddress] = useState("");
  const [issueFlag, setIssueFlag] = useState(false);
  const [parameterData, setParameterData] = useState([]);

  return (
    <MyContext.Provider
      value={{
        address,
        setAddress,
        issueFlag,
        setIssueFlag,
        parameterData,
        setParameterData,
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
    </MyContext.Provider>
  );
}

export default App;
