import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page";
import DeviceList from "./routes/DeviceList";
import Device from "./routes/Device";
import EditDevice from "./routes/EditDevice";
import AddDevice from "./routes/AddDevice";

import Root from "./routes/Root";
import Home from "./routes/Home";

import './main.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "devices",
        element: <DeviceList />,
        children: [
          {
            path: "new",
            element: <AddDevice />,
          },
          {
            path: ":id/edit",
            element: <EditDevice />,
          },
          {
            path: ":id",
            element: <Device />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
