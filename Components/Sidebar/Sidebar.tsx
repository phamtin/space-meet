import { Activity, CaretLeft, Document, Home, People, Video } from 'react-iconly';
import { Title } from '@mantine/core';
import { sinked } from 'Components/Layouts/Layouts';

import c from './sidebar.module.scss';
import { useRouter } from 'next/router';

interface SidebarProps {
  width: string;
  toggleSidebar: () => void;
}

const nav = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    link: '/',
    icon: <Activity set="bold" primaryColor="white" style={{ width: 20 }} />,
  },
  {
    id: 'meetings',
    title: 'Meetings',
    link: '/meetings',
    icon: <Video set="bold" primaryColor="white" style={{ width: 20 }} />,
  },
  {
    id: 'tasks',
    title: 'Tasks',
    link: '/tasks',
    icon: <Document set="bold" primaryColor="white" style={{ width: 20 }} />,
  },
  {
    id: 'terminals',
    title: 'Terminals',
    link: '/terminals',
    icon: <Home set="bold" primaryColor="white" style={{ width: 20 }} />,
  },
  {
    id: 'userManagement',
    title: 'User management',
    link: '/users',
    icon: <People set="bold" primaryColor="white" style={{ width: 20 }} />,
  },
];

const Sidebar = ({ width, toggleSidebar }: SidebarProps) => {
  const router = useRouter();
  const isSinked = width === sinked;
  return (
    <div className={isSinked ? c.wrapperSink : c.wrapper}>
      {!isSinked && (
        <Title order={2} sx={{ margin: 10 }}>
          SpaceMeet
        </Title>
      )}
      <div className={c.contentWrapper}>
        {nav.map((n) => (
          <div key={n.id} className={c.navItem} onClick={() => router.push(n.link)}>
            {n.icon}
            {!isSinked && <h5>{n.title}</h5>}
          </div>
        ))}
      </div>
      <div className={c.collapsIcon}>
        <div className={c.collapsIconWrapper} onClick={toggleSidebar}>
          <CaretLeft set="bold" primaryColor="blueviolet" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
