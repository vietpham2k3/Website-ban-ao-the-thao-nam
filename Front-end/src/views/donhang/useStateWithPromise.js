import { useState } from 'react';

const useStateWithPromise = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const setValueWithPromise = (newValue) => {
    return new Promise((resolve) => {
      setValue(newValue);
      resolve(newValue);
    });
  };

  return [value, setValueWithPromise];
};

export default useStateWithPromise;
