import { toastify } from 'Components/SnackBar/SnackBar';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfileApi } from '../api/user.api';

export const useUpdateProfile = () => {
  return useMutation(updateUserProfileApi, {
    onSuccess: (data) => {
      toastify('success', 'Profile updated successfully');
    },
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};
