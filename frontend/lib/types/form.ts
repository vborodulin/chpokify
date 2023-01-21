import { NestDataObject } from 'react-hook-form';
import { Message, MultipleFieldErrors, Ref } from 'react-hook-form/dist/types';

export type TFieldError = {
  type: string;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
  isManual?: boolean;
};

export type TFormErrors<TFormData> = NestDataObject<TFormData, TFieldError>
