import React from 'react';

import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import CurrencyInput from 'react-native-currency-input';
import { maskCep, maskCpfCnpj, maskPhone, removeSpace } from '../../../utils/masks';
import { BaseInput } from './BaseInput';
import { PasswordInput } from './PasswordInput';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  containerStyle?: string;
  error: string[];
}

export function InputForm({ control, name, value, containerStyle, error, ...rest }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) =>
        name === 'password' || name === 'password2' ? (
          <PasswordInput
            error={error}
            name={name}
            onChangeText={onChange}
            value={removeSpace(value)}
            containerStyle={containerStyle}
            {...rest}
          />
        ) : name === 'cpfCnpj' ? (
          <BaseInput
            maxLength={14}
            {...rest}
            onChangeText={onChange}
            containerStyle={containerStyle}
            keyboardType="numeric"
            name={name}
            error={[]}
            value={maskCpfCnpj(value)}
          />
        ) : name === 'mobilePhone' || name === 'mobile_phone' ? (
          <BaseInput
            maxLength={14}
            {...rest}
            onChangeText={onChange}
            containerStyle={containerStyle}
            keyboardType="numeric"
            name={name}
            error={[]}
            value={maskPhone(value)}
          />
        ) : name === 'postalCode' ? (
          <BaseInput
            maxLength={9}
            {...rest}
            containerStyle={containerStyle}
            onChangeText={onChange}
            keyboardType="numeric"
            name={name}
            error={[]}
            value={maskCep(value)}
          />
        ) : name === 'value' ? (
          <CurrencyInput
            value={value}
            onChangeValue={onChange}
            renderTextInput={(textInputProps) => (
              <BaseInput
                {...textInputProps}
                containerStyle={containerStyle}
                name={name}
                placeholder="R$ 0.00"
                error={error}
              />
            )}
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
          />
        ) : (
          <BaseInput
            {...rest}
            name={name}
            error={error}
            onChangeText={onChange}
            value={value}
            containerStyle={containerStyle}
          />
        )
      }
    />
  );
}
