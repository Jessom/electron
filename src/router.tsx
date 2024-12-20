import { /* createBrowserRouter, */ createHashRouter } from "react-router-dom"
import Layout from "./layout/index"
import Dashboard from "./pages/dashboard/index"
import Setting from "./pages/mine/setting/index"

import NotFound from "./pages/404"

const routes = createHashRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    index: true,
    element: <Dashboard />
  }, {
    path: "/mine/setting",
    element: <Setting />
  }]
}, {
  path: "*",
  element: <NotFound />
}])

export default routes
