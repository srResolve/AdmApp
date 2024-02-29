import { StackActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ZodError } from 'zod';
import { BaseButton } from '../../components/global/BaseButton';
import { GlobalTitle } from '../../components/global/GlobalTitle';
import { InputForm } from '../../components/global/input/FormInput';
import { AuthPutAPI, authGetAPI } from '../../lib/axios';
import { ZodEditProfileValidation } from '../../lib/zod';

export default function Profile() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const { control, handleSubmit, reset } = useForm({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  async function handleEdit(data: any) {
    try {
      const validation = ZodEditProfileValidation.parse(data);

      setButtonLoading(true);
      const connect = await AuthPutAPI('/user/update', validation);
      setButtonLoading(false);
      if (connect.status !== 200) {
        return Alert.alert('Erro', connect.body);
      }

      setEditable(false);

      Alert.alert('Sucesso', 'Seus dados foram alterados com sucesso!');

      getProfile();
    } catch (error) {
      if (error instanceof ZodError) {
        setFormErrors(error.issues.map((issue) => issue.path[0].toString() + ' ' + issue.message));
      }
    }
  }

  async function getProfile() {
    setLoading(true);
    const connect = await authGetAPI('/user/profile');
    if (connect.status !== 200) {
      Alert.alert('Erro', connect.body);
    }

    const { name, email, mobilePhone } = connect.body.user;
    reset({ name, email, mobilePhone });
    return setLoading(false);
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function logout() {
    await logout();
    return navigation.dispatch(StackActions.replace('Login'));
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 items-center  bg-primary_800">
        <GlobalTitle title="Meu Perfil" />
        <Image source={require('../../../assets/logo.png')} className="w-32 h-32" />
        {loading ? (
          <ActivityIndicator className="mt-24" size="large" />
        ) : (
          <>
            <InputForm
              containerStyle="mt-12"
              editable={editable}
              error={formErrors}
              control={control}
              name="name"
              placeholder="Nome"
            />
            <InputForm
              editable={editable}
              error={formErrors}
              control={control}
              name="email"
              placeholder="Email"
            />
            <InputForm
              editable={editable}
              error={formErrors}
              control={control}
              name="mobilePhone"
              placeholder="Telefone"
            />
            <BaseButton
              loading={buttonLoading}
              title={editable ? 'Salvar' : 'Editar'}
              variant={editable ? 'confirmation' : 'base'}
              onPress={editable ? handleSubmit(handleEdit) : () => setEditable(true)}
            />
            <BaseButton
              title="Sair"
              variant="minimal_size"
              onPress={() =>
                Alert.alert('Sair', 'Deseja realmente sair?', [
                  { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
                  { text: 'Sair', onPress: logout },
                ])
              }
              className="bg-blue-950 rounded-lg "
              titleClassName="text-zinc-400 text-lg"
            />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
