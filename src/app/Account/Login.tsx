import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ZodError } from 'zod';
import { BaseButton } from '../../components/global/BaseButton';
import { InputForm } from '../../components/global/input/FormInput';
import { PostAPI } from '../../lib/axios';
import { ZodLoginValidation } from '../../lib/zod';
import { storageToken } from '../../utils/tokenManagement';

export default function Login() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<any>();
  const [errorMessage, setErrorMessage] = useState('');
  const [formError, setFormError] = useState<string[]>([]);

  async function handleLogin(data: { email: string; password: string }) {
    try {
      setFormError([]);
      setErrorMessage('');
      setLoading(true);
      const validation = ZodLoginValidation.parse(data);
      const connect = await PostAPI('/user/login', data);
      setLoading(false);
      if (connect.status !== 200) {
        return setErrorMessage(connect.body);
      }

      await storageToken(connect.body);

      return navigation.navigate('App');
    } catch (error: any) {
      setLoading(false);
      if (error instanceof ZodError) {
        setFormError(error.issues.map((issue) => issue.path[0].toString()));
        setErrorMessage('Verifique os campos em vermelho');
      }
    }

    // navigation.navigate('App');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 flex items-center pt-32 bg-primary_800">
        <Image source={require('../../../assets/logo.png')} className="w-64 h-64" />
        <InputForm
          error={formError}
          control={control}
          name="email"
          autoCapitalize="none"
          placeholder="Email"
        />
        <InputForm error={formError} control={control} name="password" placeholder="Senha" />

        <Text className="text-red-500 mt-5 text-sm">{errorMessage}</Text>
        <BaseButton
          title="Entrar"
          loading={loading}
          onPress={handleSubmit(handleLogin)}
          variant="confirmation"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
