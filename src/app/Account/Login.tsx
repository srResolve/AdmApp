import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Button from '../../components/global/Button/Button';
import { InputForm } from '../../components/global/input/FormInput';

export default function Login() {
  const navigation = useNavigation<any>();
  const { control, handleSubmit } = useForm();

  async function handleLogin(data: { email: string; password: string }) {
    console.log(data);

    navigation.navigate('App');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 flex items-center pt-32 bg-primary_800">
        <Image source={require('../../../assets/logo.png')} className="w-64 h-64" />
        <InputForm control={control} name="email" autoCapitalize="none" placeholder="Email" />
        <InputForm control={control} name="password" placeholder="Senha" />
        <Button onPress={handleSubmit(handleLogin)} title="Entrar" variant="confirmation" />
      </View>
    </TouchableWithoutFeedback>
  );
}
