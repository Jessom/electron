import { /* createBrowserRouter, */ createHashRouter } from "react-router-dom"
import Layout from "./layout/index"
import Login from "./pages/mine/login"
import Dashboard from "./pages/dashboard/index"
import MineSetting from "./pages/mine/setting"

import NotFound from "./pages/404"

const routes = createHashRouter([{
  index: true,
  element: <Login />
}, {
  path: "/",
  element: <Layout />,
  children: [{
    path: "/dashboard",
    element: <Dashboard />
  }, {
    path: "/mine/setting",
    element: <MineSetting />
  }]
}, {
  path: "*",
  element: <NotFound />
}])

export default routes
