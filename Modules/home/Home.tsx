import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import c from './home.module.scss';

import { Badge, Button, Select, Title, Input, Text } from '@mantine/core';
import theme from 'Style/theme';
import InlineEdit from 'Components/EditableText/EditableInput';
import { useAuthStore } from 'Modules/auth/local-store/store.auth';
import { PRIMARY_SOCKET_ERROR_EVENT } from 'Infra/websocket/utils';

const HomePage: NextPage = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('EditableText SSD');
  const handler = () => setVisible(true);

  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    document.addEventListener(PRIMARY_SOCKET_ERROR_EVENT, (e) => {
      console.log(e);
    });
  });

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div className={c.homeWrapper}>
      <Title order={2}>TABLE</Title>
      <Text>{currentUser?.firstname}</Text>
      <Text>{currentUser?.lastname}</Text>
      <InlineEdit value={value} setValue={setValue} />
      <br />
      <br />
      <div>
        <Button size={'sm'} color={'orange'}>
          Submit
        </Button>
        <br />
        <br />
        <Button size={'sm'} variant={'light'} fullWidth>
          Submit
        </Button>
        <br />
        <br />
        <Button fullWidth>Submit</Button>
        <br />
        <br />
        <Button variant="gradient" fullWidth>
          Submit
        </Button>
        <br /> <br />
        <Button fullWidth variant="light" color={'red'}>
          Delete
        </Button>
        <br />
        <br />
        <Badge color="error">Label</Badge>
        <br />
        <br />
        <Input color="primary" placeholder="Guillermo Rauch" />
        <br />
        <br />
        <Input size={'sm'} color="primary" width="360px" />
        <br />
        <br />
        <Button onClick={handler}>Open modal</Button>
      </div>
      <Text>
        Compiled client and server successfully in 237 ms (736 modules) compiled client
        and server successfully in 237 ms (736 modules)
      </Text>
      <Select
        sx={{ maxWidth: 300 }}
        label="Your favorite framework"
        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' },
        ]}
      />
    </div>
  );
};

export default HomePage;
