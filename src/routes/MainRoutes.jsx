import Layout from "../components/layouts/BasicLayout";

import HomePage from '../pages/main/Homepage';

import NotFound from "pages/NotFound";

const MainRoutes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: 'default',
            element: <HomePage />,
        },
    ]
}

export default MainRoutes;