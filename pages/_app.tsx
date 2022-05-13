import { NotificationsProvider } from '@mantine/notifications';
import AppSkeleton from 'Components/AppSkeleton/AppSkeleton';
import Layout from 'Components/Layouts/Layouts';
import { MantineProvider } from '@mantine/core';
import theme from 'Style/theme';
import { useRouter } from 'next/router';

const PUBLIC_ROUTES = ['/login', '/signup'];

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  return (
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <AppSkeleton>
          {({ hasLoggedIn }) => (
            <Layout
              isAuthenticated={hasLoggedIn}
              isPublicPage={PUBLIC_ROUTES.includes(router.pathname)}
            >
              <Component {...pageProps} />
            </Layout>
          )}
        </AppSkeleton>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
