import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ZodError } from 'zod';
import { AuthPostAPI } from '../../../../lib/axios';
import { ZodCreateEntrancePaymentValidation, zodErrorHandler } from '../../../../lib/zod';
import { BaseButton } from '../../../global/BaseButton';
import { DatePickerButton } from '../../../global/DatePickerButton';
import { FinanceTypeSelector } from '../../../global/FinanceTypeSelector';
import { InputForm } from '../../../global/input/FormInput';
import { BankAccountSelector } from '../BankAccountSelector';
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
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleCreateTransaction(item: any) {
    try {
      const data = {
        ...item,
        type,
        date,
        account_id: account,
        category_id: category,
      };

      const validation = ZodCreateEntrancePaymentValidation.parse(data);

      setLoading(true);
      const connect = await AuthPostAPI('/finance/transaction', validation);
      setLoading(false);

      if (connect.status !== 201 && connect.status !== 200) {
        return setErrorMessage(connect.body.message);
      }

      Alert.alert('Entrada criada com sucesso');

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
        <View className="absolute left-0 right-0 z-10  pb-2  mx-6 rounded-xl items-center  bg-white top-16">
          <View className="flex-row items-center w-full p-2">
            <FontAwesome6 name="money-bills" size={28} color="black" />
            <Text className="text-black self-center text-2xl font-bold ml-2">
              Entradas e Saídas
            </Text>
          </View>
          <View className="px-4 w-full items-center">
            <InputForm
              control={control}
              error={[]}
              name="description"
              placeholder="Descrição"
              containerStyle="w-full bg-blue-500"
            />

            <BankAccountSelector handleSelect={setAccount} selectedValue={account} />
            <FinanceCategorySelector handleSelect={setCategory} selectedValue={category} />
            <FinanceTypeSelector setSelected={setType} selected={type} />
            <View className="w-full flex-row justify-between">
              <View className="w-6/12">
                <Text className="text-black text-lg font-semibold">Valor</Text>
                <InputForm
                  control={control}
                  error={[]}
                  containerStyle="w-full mt-2"
                  name="value"
                  placeholder="Adicione aqui alguma observação ou descrição necessária para a prestação do serviço em questão."
                />
              </View>
              <View className="w-5/12">
                <Text className="text-black text-lg font-semibold">Data</Text>
                <DatePickerButton setDate={setDate} date={date} />
              </View>
            </View>
            <Text className="text-red-500 text-sm font-semibold">{errorMessage}</Text>
            <BaseButton
              title="Criar Pagamento"
              className="mt-6 px-4"
              loading={loading}
              variant="confirmation"
              titleClassName="text-2xl ml-2"
              onPress={handleSubmit(handleCreateTransaction)}
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
