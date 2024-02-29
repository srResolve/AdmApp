import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { baseInputOnBlurValidation } from '../../../utils/onBlurValidation';

interface InputProps extends TextInputProps {
  containerStyle?: string;
  error: string[];
  name: string;
}

export function BaseInput({ containerStyle, error, ...rest }: InputProps) {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (error.filter((e) => e === rest.name).length > 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [error]);

  function onBlurVerify() {
    const verify = baseInputOnBlurValidation(rest.name, rest.value);
    if (verify) {
      setHasError(true);
    }
  }

  return (
    <View
      className={`flex-row border ${hasError ? 'border-red-700' : rest.editable ? 'border-zinc-700' : 'border-zinc-100'} items-center mt-4 w-3/4 bg-primary_400 h-14 rounded-lg overflow-hidden ${containerStyle} `}
    >
      <TextInput
        {...rest}
        onBlur={() => onBlurVerify()}
        placeholderTextColor="#3f3f46"
        className="w-full h-full px-4 text-app text-zinc-100"
      />
    </View>
  );
}
