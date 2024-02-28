import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  containerStyle?: string;
}

export function BaseInput({ containerStyle, ...rest }: InputProps) {
  return (
    <View
      className={`flex-row items-center mt-4 w-3/4 bg-primary_400 h-14 rounded-lg overflow-hidden ${containerStyle} `}
    >
      <TextInput
        {...rest}
        placeholderTextColor="#71717a"
        className="w-full h-full px-4 text-app text-zinc-100"
      />
    </View>
  );
}
