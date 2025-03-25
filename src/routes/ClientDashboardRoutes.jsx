import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/clientDashboard';

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages')));
const Medical = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/medical')));
const Chatbot = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/chat')));
const Profile = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/profile')));
const Symptom = Loadable(lazy(() => import('../pages/dashboard/client_dashboard/pages/symptom')));


const ClientDashboardLayout = {
    path: '/client_dashboard/', 
    element: <Dashboard />,
    children: [
        {
            path: '/client_dashboard/',
            element: <DashboardDefault />
        },
        {
            path: '/client_dashboard/medical',
            element: <Medical />
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
            path: '/client_dashboard/symptom',
            element: <Symptom />
        },
        {
            path: 'default',
            element: <DashboardDefault />
        }
    ]
};

export default ClientDashboardLayout;
