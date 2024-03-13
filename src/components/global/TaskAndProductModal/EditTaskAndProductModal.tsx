import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { ZodCreateTaskAndProduct } from '../../../lib/zod';
import { BackButton } from '../BackButton';
import { BaseButton } from '../BaseButton';
import { InputForm } from '../input/FormInput';

interface Props {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  data: {
    name: string;
    value: number;
    quantity: number;
  };
  handleEdit: (data: any) => void;
}

export function EditTaskAndProductModal({ title, open, setOpen, data, handleEdit }: Props) {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      name: data.name,
      quantity: data.quantity.toString(),
      value: data.value,
    },
  });

  function editTaskAndProduct(data: any) {
    try {
      setErrorMessage('');
      setFormErrors([]);
      const dataValidation = ZodCreateTaskAndProduct.parse(data);
      return handleEdit(dataValidation);
    } catch (error) {
      if (error instanceof ZodError) {
        setFormErrors(error.issues.map((issue) => issue.path[0].toString()));
        setErrorMessage('Verifique os campos em vermelho');
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <>
        <View className="absolute top-0 left-0 right-0 z-10 pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600">
          <View className="flex-row items-center w-full">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Editar Serviço</Text>
          </View>
          <View className="w-full items-center px-4">
            <InputForm
              error={formErrors}
              control={control}
              name="name"
              value="teste"
              containerStyle="w-full  self-center"
              placeholder={`Qual é o ${title}`}
            />
            <View className="flex-row w-full justify-between ">
              <InputForm
                error={formErrors}
                control={control}
                name="quantity"
                keyboardType="number-pad"
                containerStyle="w-6/12 "
                placeholder={`Qual é o ${title}`}
              />
              <InputForm
                error={formErrors}
                control={control}
                name="value"
                keyboardType="number-pad"
                containerStyle="w-5/12 "
                placeholder="Quantidade"
              />
            </View>
            <Text className="text-red-700 text-lg text-center self-center mt-5 font-bold">
              {errorMessage}
            </Text>
            <BaseButton
              title="Salvar"
              onPress={handleSubmit((data) => editTaskAndProduct(data))}
              variant="confirmation"
            />
          </View>
        </View>
        <View className="flex 1 bg-zinc-900 h-full opacity-90" />
      </>
    </Modal>
  );
}
