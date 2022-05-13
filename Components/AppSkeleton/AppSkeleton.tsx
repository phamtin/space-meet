import { useEffect, useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from 'Modules/auth/local-store/store.auth';

interface Props {
  children: (param: { hasLoggedIn: boolean }) => ReactNode;
}

const AppSkeleton = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    Promise.all([
      //   InitialService.getInitial(),
    ])
      .then(([]) => {
        //   const userProfile = initial?.userProfile
        //     ? {
        //         ...initial.userProfile,
        //         fullName: AccountManagementUtil.getFullName(
        //           initial.userProfile?.title,
        //           '',
        //           initial.userProfile?.lastName,
        //           initial.userProfile?.firstName,
        //           true
        //         ),
        //       }
        //     : null;
        //   employeeActions.setUserProfile(userProfile);
        //   WebWorker.initWorker();
      })
      .finally(() => setIsLoading(false));

    return () => {
      //   WebWorker.terminateWorker();
    };
  }, []);

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5 * 60 * 1000, //  5 minutes
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={client}>
      {children({
        hasLoggedIn: !!currentUser?._id,
      })}
    </QueryClientProvider>
  );
};

export default AppSkeleton;
