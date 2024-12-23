import { /* createBrowserRouter, */ createHashRouter } from "react-router-dom"
import Layout from "./layout/index"
import Dashboard from "./pages/dashboard/index"
import MineSetting from "./pages/mine/setting"

import NotFound from "./pages/404"

const routes = createHashRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    index: true,
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
