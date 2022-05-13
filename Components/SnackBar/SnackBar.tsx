import { Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { CloseSquare, TickSquare } from 'react-iconly';
import theme from 'Style/theme';

const common = {
  padding: 10,
  paddingRight: 11,
  paddingLeft: 11,
  paddingBottom: 7,
  marginLeft: 22,
  borderRadius: 16,
};

export function toastify(key: 'success' | 'error', msg: string) {
  let title: string = theme.colors.green[6];
  let icon = (
    <Container
      sx={{
        backgroundColor: theme.colors.green[0],
        ...common,
      }}
    >
      <TickSquare set="bold" primaryColor="green" />
    </Container>
  );

  if (key === 'error') {
    title = theme.colors.red[6];
    icon = (
      <Container
        sx={{
          backgroundColor: theme.colors.red[0],
          ...common,
        }}
      >
        <CloseSquare set="bold" primaryColor="red" />
      </Container>
    );
  }

  return showNotification({
    title: msg,
    message: null,
    autoClose: 5000,
    styles: () => ({
      root: {
        padding: 20,
        borderRadius: 12,
        '& .__mantine-ref-icon': {
          backgroundColor: 'transparent',
        },
      },
      title: { color: title, marginLeft: 18, fontSize: 15 },
    }),
    icon: icon,
  });
}
