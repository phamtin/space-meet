import { useState } from 'react';
import { useRouter } from 'next/router';
import { Message, Lock } from 'react-iconly';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, PasswordInput, TextInput, Title } from '@mantine/core';

import { useAuthStore } from 'Modules/auth/local-store/store.auth';
import { EmailRule, PasswordRule } from 'Modules/auth/helper/auth.helper';
import { useSignin } from 'Modules/auth/hook/auth.hook';
import { SigninPayload } from 'Modules/auth/auth';
import c from './signin-screen.module.scss';

const SigninScreen = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: signin, isLoading } = useSignin();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const onHandleSignin: SubmitHandler<SigninPayload> = (values: SigninPayload) => {
    signin(values).then((data) => {
      if (data?._id) {
        setCurrentUser(data);
        router.replace('/');
      }
    });
  };
  console.log('RENDER !!!!!!!!!!!!!');

  return (
    <div className={c.signinWrapper}>
      <div className={c.contentWrapper}>
        <div className={c.left} />
        <div className={c.right}>
          <div className={c.rightWrapper}>
            <div className={c.box}>
              <form onSubmit={handleSubmit(onHandleSignin)}>
                <Title order={2}>Sign in</Title>
                <Title order={6}>Welcome back, Sign in to save the world! 🚀</Title>
                <br />
                <br />
                <Controller
                  control={control}
                  name="email"
                  rules={EmailRule}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      aria-label="email"
                      error={errors.email?.message}
                      size="md"
                      placeholder="Email address"
                      label="Email"
                      type="text"
                      icon={
                        <Message set="two-tone" primaryColor="blue" size={'medium'} />
                      }
                    />
                  )}
                />
                <br />
                <Controller
                  control={control}
                  name="password"
                  rules={PasswordRule}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      label="Password"
                      size="md"
                      aria-label="password"
                      placeholder="Password"
                      error={errors.password?.message}
                      icon={<Lock set="two-tone" primaryColor="blue" size={'medium'} />}
                    />
                  )}
                />
                <br />
                <br />
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  loading={isLoading}
                  variant="gradient"
                  sx={{
                    boxShadow: isLoading ? undefined : '0px 4px 8px #6d85fe',
                  }}
                >
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninScreen;
