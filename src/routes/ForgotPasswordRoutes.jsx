import AdminLayout from "../components/layouts/AdminLayout";

import Home from "../pages/main/Home";

const ForgotPasswordRoutes = {
    path: '/forgot-password',
    element: <AdminLayout />,
    children: [
        {
            path: '/forgot-password',
            element: <Home />,
        },
        {
            path: 'default',
            element: <Home />,
        },
    ]
}

export default ForgotPasswordRoutes;