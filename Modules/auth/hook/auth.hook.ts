import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toastify } from 'Components/SnackBar/SnackBar';
import authApi from '../api/api.auth';

export const useSignin = (): any => {
  return useMutation(authApi.loginApi, {
    onSuccess: async (data: any) => {
      toastify('success', 'Signin successfully!');
      return data;
    },
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};
