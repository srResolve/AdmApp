import { AntDesign, Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Text, View } from 'react-native';
import { BaseButton } from '../../../global/BaseButton';
import { ButtonWithIcon } from '../../../global/ButtonWithIcon';
import { DatePickerButton } from '../../../global/DatePickerButton';
import { DoubleIconButton } from '../../../global/DoubleIconButton';
import { FinanceTypeSelector } from '../../../global/FinanceTypeSelector';
import { InputForm } from '../../../global/input/FormInput';
import { FinanceCategorySelector } from '../FinanceCategorySelector';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
}

export function NewEntranceModal({ open, setOpen, handleUpdate }: Props) {
  const { control, handleSubmit } = useForm();
  const [type, setType] = useState<'INCOME' | 'OUTCOME' | ''>('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10  pb-2   mx-6 rounded-xl items-center  bg-primary_600 top-32">
        <View className="flex-row items-center w-full p-2">
          <FontAwesome6 name="money-bills" size={28} color="white" />
          <Text className="text-zinc-100 self-center text-2xl font-bold ml-2">
            Entradas e Saídas
          </Text>
        </View>
        <View className="px-4 w-full items-center">
          <InputForm
            control={control}
            error={[]}
            name="description"
            placeholder="Descrição"
            containerStyle="w-full"
          />
          <DoubleIconButton
            leftIcon={<MaterialIcons name="folder-copy" size={28} color="white" />}
            rightIcon={<Entypo name="chevron-down" size={28} color="white" />}
            className="bg-primary_400 border border-zinc-50"
            title="Conta Bancária"
            titleClassName="text-xl"
          />
          <FinanceCategorySelector handleSelect={setCategory} selectedValue={category} />
          <FinanceTypeSelector setSelected={setType} selected={type} />
          <View className="w-full flex-row justify-between">
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
              <DatePickerButton setDate={setDate} date={date} />
            </View>
          </View>
          <ButtonWithIcon
            title="Criar conta"
            className="mt-6 px-4"
            titleClassName="text-2xl ml-2"
            icon={<AntDesign name="pluscircleo" size={28} color="white" />}
          />
          <BaseButton
            title="Voltar"
            className="bg-primary_700 w-28 rounded-xl"
            onPress={() => setOpen(false)}
          />
        </View>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
