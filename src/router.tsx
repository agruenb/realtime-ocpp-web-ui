import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home/Home";
import Navbar from "./features/Navbar/Navbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Navbar />
            <Home />
        </>,
    },
    {
        path: "/test",
        element: <>
            <Navbar />
            <div> TEST </div>
        </>,
    },
]);
export default router;