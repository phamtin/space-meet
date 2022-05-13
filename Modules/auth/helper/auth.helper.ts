import { RegisterOptions } from 'react-hook-form';
import { baseFieldValidation } from 'Utils/validator/validator';
import { EMAIL_REGEX } from 'Helper/regex';

export const EmailRule: RegisterOptions = {
  ...baseFieldValidation('Email', true, 1, null, EMAIL_REGEX),
};

export const PasswordRule: RegisterOptions = {
  ...baseFieldValidation('PassWord', true, 1),
};
