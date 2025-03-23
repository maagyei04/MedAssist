import { createBrowserRouter } from "react-router-dom";

import MainRoutes from "./MainRoutes";
//import ClientDashboardLayout from "./ClientDashboardRoutes";
//import ForgotPasswordRoutes from "./ForgotPasswordRoutes";

const router = createBrowserRouter([MainRoutes], { basename: '/' });

export default router;