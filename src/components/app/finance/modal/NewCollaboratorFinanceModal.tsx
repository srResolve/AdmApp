import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { Modal, Text, View } from 'react-native';
import { BaseButton } from '../../../global/BaseButton';
import { ButtonWithIcon } from '../../../global/ButtonWithIcon';
import { DoubleIconButton } from '../../../global/DoubleIconButton';
import { InputForm } from '../../../global/input/FormInput';
export function NewCollaboratorFinanceModal() {
  const { control, handleSubmit } = useForm();

  return (
    <Modal visible={true} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10  pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 top-32">
        <View className="flex-row items-center w-full p-2">
          <FontAwesome5 name="users-cog" size={28} color="white" />
          <Text className="text-zinc-100 self-center text-2xl font-bold ml-2">Colaboradores</Text>
        </View>
        <View className="px-4 w-full items-center">
          <DoubleIconButton
            leftIcon={<FontAwesome5 name="user-cog" size={28} color="white" />}
            rightIcon={<Entypo name="chevron-down" size={28} color="white" />}
            className="bg-primary_400 border border-zinc-50"
            title="Colaborador"
            titleClassName="text-xl"
          />
          <View className="w-full flex-row justify-between mt-4">
            <View className="w-6/12">
              <Text className="text-zinc-100 text-lg font-semibold">Valor</Text>
              <InputForm
                control={control}
                error={[]}
                containerStyle="w-full mt-2"
                name="value"
                placeholder="Adicione aqui alguma observação ou descrição necessária para a prestação do serviço em questão."
              />
            </View>
            <View className="w-5/12">
              <Text className="text-zinc-100 text-lg font-semibold">Data</Text>
              <InputForm
                control={control}
                error={[]}
                containerStyle="w-full mt-2"
                name="date"
                keyboardType="number-pad"
                placeholder="5, 10, 15 ..."
              />
            </View>
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
