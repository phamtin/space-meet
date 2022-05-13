import { useRouter } from 'next/router';
import { Avatar, Menu, Title } from '@mantine/core';
import { memo } from 'react';
import { Folder, Logout, Search, User } from 'react-iconly';

import c from './navbar.module.scss';
import theme from 'Style/theme';

interface NavbarProps {
  width: string;
  logout: () => void;
}

const itemCss = {
  color: theme.colors.dark[5],
  fontWeight: 500,
  '&:hover': { backgroundColor: theme.colors.indigo[0] },
};

const Navbar = ({ width, logout }: NavbarProps) => {
  const router = useRouter();
  const navWidth = { width: `calc(100vw-${width}` };

  const onHandleLogout = () => logout();

  return (
    <div className={c.wrapper} style={navWidth}>
      <div className={c.wrapperContent}>
        <Title order={4}>Hello Manager !</Title>
        <Menu width={'220px'}>
          <Menu.Target>
            <div className={c.avatarWrapper}>
              <Avatar
                size={45}
                src="https://picsum.photos/seed/picsum/100"
                alt="it's me"
              />
              <Title order={6} sx={{ marginLeft: 9 }}>
                Tin Pham
              </Title>
            </div>
          </Menu.Target>
          <Menu.Dropdown sx={{ boxShadow: '1px 3px 12px #babbffb8' }}>
            <Menu.Item
              sx={itemCss}
              icon={<User primaryColor="blueviolet" size={'small'} />}
              onClick={() => router.push('/profile')}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              sx={itemCss}
              icon={<Folder primaryColor="blueviolet" size={'small'} />}
            >
              Messages
            </Menu.Item>
            <Menu.Item
              sx={itemCss}
              icon={<Search primaryColor="blueviolet" size={'small'} />}
            >
              Gallery
            </Menu.Item>

            <Menu.Divider />
            <Menu.Item
              color="red"
              icon={<Logout primaryColor="blueviolet" />}
              onClick={onHandleLogout}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default memo(Navbar);
