import { useMemo, useState } from 'react';
import {
  UseForm,
  SetInputValue,
  RemoveInputError,
  InputHandlers,
} from './interface';

/**
 * create a new form
 * @param config - the initial form config
 * @returns form handlers
 */
const useForm: UseForm = (config = {}) => {
  const [values, setValues] = useState(config.initialValues || {});
  const [formErrors, setFormErrors] = useState(config.initialFormErrors || {});

  const initialState = useMemo(() => config.initialValues || {}, []);

  const setInputValue: SetInputValue = (inputName, inputValue) => {
    setValues((prevValues) => ({ ...prevValues, [inputName]: inputValue }));
  };

  const removeInputError: RemoveInputError = (inputName) => {
    if (formErrors[inputName]) {
      setFormErrors((prev: { [key: string]: any }) => {
        const currentErrors = { ...prev };
        delete currentErrors[inputName];
        return currentErrors;
      });
    }
  };

  const registerInput = (inputName: string): InputHandlers => ({
    onFocus: () => removeInputError(inputName),
    onChange: (event) => setInputValue(inputName, event.target.value),
    error: !!formErrors[inputName],
    name: inputName,
    value: values[inputName] || '',
  });

  const registerCheckbox = (checkboxName: string): InputHandlers => ({
    onFocus: () => removeInputError(checkboxName),
    onChange: (event) => setInputValue(checkboxName, !!event.target.checked),
    name: checkboxName,
    error: !!formErrors[checkboxName],
    checked: !!values[checkboxName],
  });

  const registerRadio = (
    radionName: string,
    radioValue: string
  ): InputHandlers => ({
    onFocus: () => removeInputError(radionName),
    onChange: (event) => {
      if (event.target.checked) setInputValue(radionName, radioValue);
    },
    name: radionName,
    error: !!formErrors[radionName],
    checked: values[radionName] === radioValue,
    value: radioValue,
  });

  const reset = () => setValues(initialState);

  return {
    setInputValue,
    removeInputError,
    setFormErrors,
    values,
    formErrors,
    registerInput,
    registerCheckbox,
    registerRadio,
    reset,
  };
};

export default useForm;
