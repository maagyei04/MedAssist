import Layout from "../components/layouts/BasicLayout";

import Home from "../pages/main/Home";

import NotFound from "../pages/NotFound";

const MainRoutes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: 'default',
            element: <Home />,
        },
    ]
}

export default MainRoutes;