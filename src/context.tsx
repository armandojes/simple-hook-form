import React, { createContext, useContext } from 'react';
import { FormHandlers, FormProviderProps } from './interface';

const intialValues: FormHandlers = {
  formErrors: {},
  setFormErrors: () => {},
  removeInputError: () => {},
  values: {},
  setInputValue: () => {},
  registerInput: () => ({
    error: false,
    name: 'initialName',
    onChange: () => {},
    onFocus: () => {},
    value: 'initialValue',
  }),
  registerCheckbox: () => ({
    error: false,
    name: 'initialName',
    onChange: () => {},
    onFocus: () => {},
    checked: false,
  }),
  registerRadio: () => ({
    error: false,
    name: 'initialName',
    onChange: () => {},
    onFocus: () => {},
    checked: false,
  }),
};

const formContext = createContext(intialValues);

export const useFormContext = (): FormHandlers => useContext(formContext);

export function FormProvider({
  children,
  ...formHandlersProp
}: FormProviderProps) {
  return (
    <formContext.Provider value={formHandlersProp}>
      {children}
    </formContext.Provider>
  );
}
