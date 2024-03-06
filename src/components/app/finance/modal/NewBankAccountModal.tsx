import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { Modal, Text, View } from 'react-native';
import { BaseButton } from '../../../global/BaseButton';
import { ButtonWithIcon } from '../../../global/ButtonWithIcon';
import { InputForm } from '../../../global/input/FormInput';
export function NewBankAccountModal() {
  const { control, handleSubmit } = useForm();

  return (
    <Modal visible={false} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10  pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 top-32">
        <View className="flex-row items-center w-full p-2">
          <FontAwesome name="bank" size={28} color="white" />
          <Text className="text-zinc-100 self-center text-2xl font-bold ml-2">Nova Conta</Text>
        </View>
        <View className="px-4 w-full items-center">
          <InputForm
            control={control}
            error={[]}
            name="observation"
            placeholder="Nome do Banco"
            containerStyle="w-full"
          />
          <View className="mt-4">
            <Text className="text-zinc-100 text-xl font-semibold">Saldo Atual</Text>
            <InputForm control={control} error={[]} name="value" containerStyle="w-full mt-2" />
          </View>
          <ButtonWithIcon
            title="Criar conta"
            className="mt-6 px-4"
            titleClassName="text-2xl ml-2"
            icon={<AntDesign name="pluscircleo" size={28} color="white" />}
          />
          <BaseButton title="Voltar" className="bg-primary_700 w-28 rounded-xl" />
        </View>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
