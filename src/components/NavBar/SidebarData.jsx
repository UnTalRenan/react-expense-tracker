import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
export const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <FaIcons.FaChartBar />,
      cName: 'nav-text'
    },
    {
      title: 'Logout',
      path: '/logout',
      icon: <FaIcons.FaKey />,
      cName: 'nav-text'
    }
  ];