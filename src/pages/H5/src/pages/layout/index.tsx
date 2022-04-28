import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigator from "./mods/Navigator";
import BannerComponent from "@/pages/H5/components/BannerComponent";
import { MyContext } from "../../static/js/context-manager";
import "./index.css";
import { getAllParameter } from "@/contract/function/ParameterFunc";
import Home from "../Home";
import Detail from "../detail";
function App() {
  const [address, setAddress] = useState("");
  const [issueFlag, setIssueFlag] = useState(false);
  const [parameterData, setParameterData] = useState([]);

  const getParameter = async () => {
    try {
      const res = await getAllParameter();
      setParameterData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (address.length === 0) return;
    getParameter();
  }, [address]);
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
        <BannerComponent />
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
