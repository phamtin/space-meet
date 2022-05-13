import { useState, useEffect, memo, ReactNode, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { PRIMARY_SOCKET_OPEN_EVENT, startPrimarySocket } from 'Infra/websocket/utils';
import { useAuthStore } from 'Modules/auth/local-store/store.auth';
import c from './layouts.module.scss';

interface LayoutProps {
  isAuthenticated: boolean;
  children: ReactNode;
  isPublicPage: boolean;
}

export const expanded = '265px';
export const sinked = '55px';
const WIDTH_SIDEBAR = {
  expand: expanded,
  sink: sinked,
};

const Navbar = dynamic(() => import('Components/Navbar/Navbar'));
const Sidebar = dynamic(() => import('Components/Sidebar/Sidebar'));

const Layout = ({ children, isAuthenticated, isPublicPage }: LayoutProps) => {
  const router = useRouter();

  const [isSocketOpened, setIsSocketOpened] = useState<boolean>(false);
  const [sideBarWidth, setSideBarWidth] = useState<string>(expanded);
  const [isExpand, setIsExpand] = useState(true);

  const removeCurrentUser = useAuthStore((state) => state.removeCurrentUser);

  const toggleSidebar = () => {
    setIsExpand((prev) => !prev);
    if (sideBarWidth === expanded) {
      return setSideBarWidth(sinked);
    }
    return setSideBarWidth(expanded);
  };

  const _socketOpenEventListener = () => {
    setIsSocketOpened(true);
  };

  const _init = useCallback(() => {
    startPrimarySocket('ws://localhost:9000');
    global['addEventListener'](PRIMARY_SOCKET_OPEN_EVENT, _socketOpenEventListener);
  }, [PRIMARY_SOCKET_OPEN_EVENT, _socketOpenEventListener]);

  useEffect(() => {
    if (isAuthenticated) {
      // _init();
    }
  }, [_init, isAuthenticated]);

  // if (!isSocketOpened && isAuthenticated) {
  //   return <p>Websocket hasn't started yet!!!</p>;
  // }

  if (!isAuthenticated && !isPublicPage) {
    router.replace('/login');
  }

  const shouldRenderPublicPage = () => {
    if (isAuthenticated) {
      router.replace('/');
      return;
    }
    return children;
  };

  const onLogout = () => {
    removeCurrentUser();
  };

  return (
    <div className={c.wrapper}>
      {isPublicPage
        ? shouldRenderPublicPage()
        : isAuthenticated && (
            <>
              <Sidebar
                width={isExpand ? WIDTH_SIDEBAR.expand : WIDTH_SIDEBAR.sink}
                toggleSidebar={toggleSidebar}
              />
              <div className={c.content}>
                <Navbar width={sideBarWidth} logout={onLogout} />
                <div className={c.mainArea}>{children}</div>
              </div>
            </>
          )}
    </div>
  );
};

export default memo(Layout);
