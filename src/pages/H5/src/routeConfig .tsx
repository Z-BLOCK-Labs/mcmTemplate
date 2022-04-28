import { RouteConfig } from 'react-router-config';
import Home from './pages/Home';
const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: false,
    component: Home
  },
]

export default routesConfig;