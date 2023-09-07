import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import RootLayout from "./layouts/RootLayout";
import EditPage, { loader as EditPageLoader } from "./EditPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/edit/:id",
                element: <EditPage />,
                loader: EditPageLoader
            }
        ]
    },
]);
