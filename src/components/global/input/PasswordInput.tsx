import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { baseInputOnBlurValidation } from '../../../utils/onBlurValidation';

interface Props extends TextInputProps {
  containerStyle?: any;
  error: string[];
  name: string;
}

export function PasswordInput({ containerStyle, error, ...rest }: Props) {
  const [hidePass, setHidePass] = useState(true);
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
      className={`flex-row border ${hasError ? 'border-red-700' : rest.editable ? 'border-zinc-100' : 'border-zinc-700'} items-center mt-4 w-3/4 bg-primary_400 h-14 rounded-lg overflow-hidden ${containerStyle} `}
    >
      <TextInput
        onBlur={() => onBlurVerify()}
        {...rest}
        placeholderTextColor="#3f3f46"
        secureTextEntry={hidePass}
        className="w-5/6 h-full px-4 text-app text-zinc-100 "
      />
      <TouchableOpacity
        className="w-1/6 h-full items-center justify-center "
        onPress={() => setHidePass(!hidePass)}
      >
        {hidePass ? (
          <Ionicons color="#f4f4f5" name="eye" size={25} />
        ) : (
          <Ionicons color="#fafafa" name="eye-off" size={25} />
        )}
      </TouchableOpacity>
    </View>
  );
}
