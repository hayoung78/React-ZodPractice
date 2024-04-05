import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/layout";
import MainPage from "../pages/main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
        ],
    },
]);
export default router;
