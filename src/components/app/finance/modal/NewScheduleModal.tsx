import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { Image, Modal, Text, View } from 'react-native';
import { BaseButton } from '../../../global/BaseButton';
import { ButtonWithIcon } from '../../../global/ButtonWithIcon';
import { InputForm } from '../../../global/input/FormInput';
export function NewScheduleModal() {
  const { control, handleSubmit } = useForm();

  return (
    <Modal visible={false} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10  pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 top-32">
        <View className="flex-row items-center w-full p-2">
          <FontAwesome6 name="clock" size={28} color="white" />
          <Text className="text-zinc-100 self-center text-2xl font-bold ml-2">
            Novo Agendamento
          </Text>
        </View>
        <View className="px-4 w-full items-center">
          <InputForm
            control={control}
            error={[]}
            name="observation"
            placeholder="Descrição"
            containerStyle="w-full"
          />
          <View className="flex-row w-full justify-between my-4">
            <ButtonWithIcon
              title="Entrada"
              className="w-5/12"
              titleClassName="text-xl ml-2"
              icon={<Image source={require('../../../../../assets/inputIcon.png')} />}
            />
            <ButtonWithIcon
              className="w-5/12 bg-red-700"
              title="Saída"
              titleClassName="text-xl ml-2"
              icon={<Image source={require('../../../../../assets/outputIcon.png')} />}
            />
          </View>
          <View className="w-full flex-row justify-between">
            <View className="w-6/12">
              <Text className="text-zinc-100 text-sm font-semibold">Valor</Text>
              <InputForm
                control={control}
                error={[]}
                containerStyle="w-full mt-2"
                name="value"
                placeholder="Adicione aqui alguma observação ou descrição necessária para a prestação do serviço em questão."
              />
            </View>
            <View className="w-5/12">
              <Text className="text-zinc-100 text-sm font-semibold">Dia de Vencimento</Text>
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
            title="Adicionar na Agenda"
            className="mt-6 px-4"
            titleClassName="text-2xl ml-2"
            icon={<AntDesign name="pluscircleo" size={28} color="white" />}
          />
          <BaseButton title="Voltar" className="bg-primary_700" />
        </View>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
