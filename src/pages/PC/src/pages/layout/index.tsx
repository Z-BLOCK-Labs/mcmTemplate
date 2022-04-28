import React, { useState, useEffect } from "react";
import "./index.less";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Detail from "../detail";
import Navigate from "../../components/Navgate/index";
import BannerComponent from "@/pages/PC/src/components/BannerComponent";
import Loading from "../../components/LoadingWindows";
import { MyContext } from "../../untiles/context";
function App() {
  const [count, setCount] = useState(0);
  const [address_, setAddress_] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {}, [showLoading]);
  return (
    <MyContext.Provider
      value={{
        count,
        setCount,
        address_,
        setAddress_,
        showLoading,
        setShowLoading,
      }}
    >
      <div className="main">
        <Navigate></Navigate>

        <div className="main_area">
          {showLoading ? <Loading></Loading> : null}
          <BannerComponent></BannerComponent>
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