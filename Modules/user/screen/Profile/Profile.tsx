import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useUpdateProfile } from 'Modules/user/hook/user.hook';
import { Input, Text, Button, Title } from '@mantine/core';

import c from './profile.module.css';

const ConfirmPopover = dynamic(() => import('Components/ConfirmPopover/ConfirmPopover'));

interface ProfileProp {}

const ProfileScreen = ({}: ProfileProp) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstname: 'Huracann !!',
      lastname: '',
      email: '',
    },
  });
  const [opened, setOpened] = useState(false);
  const { mutate: mutateUserProfile } = useUpdateProfile();

  const handleSubmitData = (data) => {
    mutateUserProfile(data);
  };

  return (
    <div className={c.wrapper}>
      <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
        <Title>Update Profile</Title>
        <Controller
          name="firstname"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 2,
              message: 'This field is too short',
            },
          }}
          render={({ field }) => {
            return <Input {...field} />;
          }}
        />
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => {
            return <Input {...field} />;
          }}
        />
        <Input type="email" disabled />
        <Button>Submit</Button>
      </form>
      <ConfirmPopover
        isOpen={opened}
        text="Are you sure to delete this task?"
        onCancel={() => setOpened(false)}
        onOk={() => setOpened(false)}
      >
        <Button onClick={() => setOpened(true)}>Delete user</Button>
      </ConfirmPopover>
    </div>
  );
};

export default ProfileScreen;
