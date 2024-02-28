import React from 'react';

import { Control, Controller } from 'react-hook-form';
import { TextInputProps, View } from 'react-native';

import { maskCep, maskCpfCnpj, maskPhone, removeSpace } from '../../../utils/masks';
import { BaseInput } from './BaseInput';
import { PasswordInput } from './PasswordInput';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  passwordContainerStyle?: any;
}

export function InputForm({ control, name, value, passwordContainerStyle, ...rest }: Props) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          name === 'password' || name === 'password2' ? (
            <PasswordInput
              onChangeText={onChange}
              value={removeSpace(value)}
              containerStyle={passwordContainerStyle}
              {...rest}
            />
          ) : name === 'cpfCnpj' ? (
            <BaseInput
              maxLength={14}
              {...rest}
              onChangeText={onChange}
              keyboardType="numeric"
              value={maskCpfCnpj(value)}
            />
          ) : name === 'mobilePhone' ? (
            <BaseInput
              maxLength={14}
              {...rest}
              onChangeText={onChange}
              keyboardType="numeric"
              value={maskPhone(value)}
            />
          ) : name === 'postalCode' ? (
            <BaseInput
              maxLength={9}
              {...rest}
              onChangeText={onChange}
              keyboardType="numeric"
              value={maskCep(value)}
            />
          ) : (
            <BaseInput {...rest} onChangeText={onChange} value={value} />
          )
        }
      />
    </View>
  );
}
