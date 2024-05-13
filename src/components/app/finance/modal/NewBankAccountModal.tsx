import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ZodError } from 'zod';
import { AuthPostAPI } from '../../../../lib/axios';
import { ZodCreateBankAccountValidation, zodErrorHandler } from '../../../../lib/zod';
import { BaseButton } from '../../../global/BaseButton';
import { InputForm } from '../../../global/input/FormInput';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
}

export function NewBankAccountModal({ open, setOpen, handleUpdate }: Props) {
  const { control, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleCreate(item: any) {
    try {
      setErrorMessage('');

      const data = {
        name: item.name,
        initialBalance: item.value,
      };

      const validation = ZodCreateBankAccountValidation.parse(data);
      setLoading(true);
      const connect = await AuthPostAPI('/bank-account', validation);
      setLoading(false);

      if (connect.status !== 201 && connect.status !== 200) {
        setErrorMessage(connect.body.message);
      }

      Alert.alert('Conta criada com sucesso');

      setOpen(false);
      return handleUpdate();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(zodErrorHandler(error));
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="absolute left-0 right-0 z-10  pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 top-32">
          <View className="flex-row items-center w-full p-2">
            <FontAwesome name="bank" size={28} color="white" />
            <Text className="text-black self-center text-2xl font-bold ml-2">Nova Conta</Text>
          </View>
          <View className="px-4 w-full items-center">
            <InputForm
              control={control}
              error={[]}
              name="name"
              placeholder="Nome do Banco"
              containerStyle="w-full"
            />
            <View className="mt-4">
              <Text className="text-black text-xl font-semibold">Saldo Atual</Text>
              <InputForm control={control} error={[]} name="value" containerStyle="w-full mt-2" />
            </View>
            <Text className="text-red-700 mt-6 font-semibold">{errorMessage}</Text>
            <BaseButton
              title="Criar conta"
              className="mt-2 px-4"
              titleClassName="text-2xl ml-2"
              loading={loading}
              variant="confirmation"
              onPress={handleSubmit(handleCreate)}
            />
            <BaseButton
              title="Voltar"
              className="bg-primary_700 w-28 rounded-xl"
              onPress={() => setOpen(false)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
