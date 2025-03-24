import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/clientDashboard';

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages')));
const Orders = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/orders')));
const Chatbot = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/chat')));
const Profile = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/profile')));


const ClientDashboardLayout = {
    path: '/client_dashboard/',
    element: <Dashboard />,
    children: [
        {
            path: '/client_dashboard/',
            element: <DashboardDefault />
        },
        {
            path: '/client_dashboard/orders',
            element: <Orders />
        },
        {
            path: '/client_dashboard/chat',
            element: <Chatbot />
        },
        {
            path: '/client_dashboard/profile',
            element: <Profile />
        },
        {
            path: 'default',
            element: <DashboardDefault />
        }
    ]
};

export default ClientDashboardLayout;
