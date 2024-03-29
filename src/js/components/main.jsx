import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom"
import ScoreBoardView from "./ScoreboardView"
import ScoreDetailView, { loader as scoreDetailLoader } from "./ScoreDetailView"
import App from "./App"
import "@resources/index.css"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App/>}
    >
      <Route
        index
        element={<ScoreBoardView/>}
      />
      <Route
        path="details/:participant/:scoreType"
        element={<ScoreDetailView/>}
        loader={scoreDetailLoader}
      />
    </Route> 
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
