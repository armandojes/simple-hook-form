import { ChangeEvent, ReactElement } from 'react';

export type SetInputValue = (inputName: string, inputValue: any) => void;

export type RemoveInputError = (inputName: string) => void;

export type SetFormErrors = (inputErrors: object) => void;

export type UseForm = (config?: UseFormConfig) => FormHandlers;

export type Reset = () => void;

export interface UseFormConfig {
  initialValues?: { [key: string]: any };
  initialFormErrors?: { [key: string]: any };
}

export interface FormHandlers {
  setInputValue: SetInputValue;
  removeInputError: RemoveInputError;
  setFormErrors: SetFormErrors;
  values: { [key: string]: any };
  formErrors: { [key: string]: any };
  registerInput: (inputName: string) => InputHandlers;
  registerCheckbox: (checkboxName: string) => InputHandlers;
  registerRadio: (radioName: string, radioValue: string) => InputHandlers;
  /**
   * reset into initial form values
   */
  reset: Reset;
}

export interface InputHandlers {
  checked?: boolean;
  value?: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  error: boolean;
  name: string;
}

export interface FormProviderProps extends FormHandlers {
  children: ReactElement;
}
