import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ZodError } from 'zod';
import { AuthPostAPI } from '../../../../lib/axios';
import { ZodCreateSchedulePaymentValidation, zodErrorHandler } from '../../../../lib/zod';
import { BaseButton } from '../../../global/BaseButton';
import { DatePickerButton } from '../../../global/DatePickerButton';
import { FinanceTypeSelector } from '../../../global/FinanceTypeSelector';
import { InputForm } from '../../../global/input/FormInput';
import { FinanceCategorySelector } from '../FinanceCategorySelector';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
}

export function NewScheduleModal({ open, setOpen, handleUpdate }: Props) {
  const { control, handleSubmit } = useForm();
  const [type, setType] = useState<'INCOME' | 'OUTCOME' | ''>('');
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  async function handleCreate(item: any) {
    try {
      setErrorMessage('');
      const data = {
        ...item,
        type,
        date,
        categoryId: category,
      };

      const validation = ZodCreateSchedulePaymentValidation.parse(data);

      setLoading(true);
      const connect = await AuthPostAPI('/finance/schedule/transaction', validation);
      setLoading(false);

      if (connect.status !== 201 && connect.status !== 200) {
        setErrorMessage(connect.body.message);
      }

      Alert.alert('Agendamento criado com sucesso');
      return handleUpdate();
    } catch (error) {
      if (error instanceof ZodError) {
        if (error instanceof ZodError) {
          setErrorMessage(zodErrorHandler(error));
        }
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              name="name"
              placeholder="Descrição"
              containerStyle="w-full"
            />
            <FinanceTypeSelector selected={type} setSelected={setType} />
            <FinanceCategorySelector selectedValue={category} handleSelect={setCategory} />
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
                <DatePickerButton date={date} setDate={setDate} />
              </View>
            </View>
            <Text className="text-red-700 text-lg font-bold self-center mt-4">{errorMessage}</Text>
            <BaseButton
              title="Adicionar"
              loading={loading}
              className="mt-0 px-4 "
              titleClassName="text-2xl ml-2"
              variant="confirmation"
              onPress={handleSubmit(handleCreate)}
            />
            <BaseButton
              title="Voltar"
              className="bg-primary_700 w-16 rounded-lg py-2"
              titleClassName="text-lg"
              onPress={() => setOpen(false)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
