import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface Props extends TextInputProps {
  containerStyle?: any;
}

export function PasswordInput({ containerStyle, ...rest }: Props) {
  const [hidePass, setHidePass] = useState(true);

  return (
    <View className="flex-row items-center mt-4 w-3/4 bg-primary_400 h-14 rounded-2xl overflow-hidden">
      <TextInput
        {...rest}
        placeholderTextColor="#71717a"
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
