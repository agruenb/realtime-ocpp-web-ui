import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home/Home";
import Navbar from "./features/navbar/Navbar";
import Stations from "./routes/stations/Stations";
import OcppSessions from "./routes/ocppSessions/OcppSessions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Navbar />
            <Home />
        </>,
    },
    {
        path: "/stations",
        element: <>
            <Navbar />
            <Stations />
        </>,
    },
    {
        path: "/ocppSessions",
        element: <>
            <Navbar />
            <OcppSessions />
        </>,
    },
]);
export default router;