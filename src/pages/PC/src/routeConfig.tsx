import { RouteConfig } from "react-router-config";
import Home from "./pages/Home";
import Detail from "./pages/detail";
const routesConfig: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/detail",
    component: Detail,
  },
];

export default routesConfig;
