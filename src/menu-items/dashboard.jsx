// assets
import { DashboardOutlined, UserOutlined, SearchOutlined, CreditCardOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  SearchOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'client-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/client_dashboard/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'chat',
      title: 'ChatBot Screen',
      type: 'item',
      url: '/client_dashboard/chat',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'symptom',
      title: 'Symptom Checker',
      type: 'item',
      url: '/client_dashboard/symptom',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'medical',
      title: 'Medication Info',
      type: 'item',
      url: '/client_dashboard/medical',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/client_dashboard/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};


export default dashboard;