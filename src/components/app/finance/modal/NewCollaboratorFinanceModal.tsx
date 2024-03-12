import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Modal, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { AuthPostAPI } from '../../../../lib/axios';
import { ZodCreateCollaboratorWageValidation, zodErrorHandler } from '../../../../lib/zod';
import { BaseButton } from '../../../global/BaseButton';
import { CollaboratorModal } from '../../../global/CollaboratorModal/CollaboratorModal';
import { DatePickerButton } from '../../../global/DatePickerButton';
import { DoubleIconButton } from '../../../global/DoubleIconButton';
import { InputForm } from '../../../global/input/FormInput';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
}

export function NewCollaboratorFinanceModal({ open, setOpen, handleUpdate }: Props) {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collaborator, setCollaborator] = useState<{ id: string; name: string }>();
  const [date, setDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleCreate(item: any) {
    try {
      const data = {
        ...item,
        user_id: collaborator?.id,
        date,
      };

      const validation = ZodCreateCollaboratorWageValidation.parse(data);
      setLoading(true);
      const connect = await AuthPostAPI('/finance/wage', validation);
      setLoading(false);

      if (connect.status !== 201 && connect.status !== 200) {
        return setErrorMessage(connect.body.message);
      }

      Alert.alert('Salário criada com sucesso');

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
            title={collaborator ? collaborator.name : 'Selecione o colaborador'}
            onPress={() => setModal(!modal)}
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
              <DatePickerButton date={date} setDate={setDate} />
            </View>
          </View>
          <Text className="text-red-700 text-lg">{errorMessage}</Text>
          <BaseButton
            title="Criar"
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
        <CollaboratorModal
          open={modal}
          setOpen={setModal}
          selectedValue={collaborator?.id || ''}
          handleSelect={setCollaborator}
        />
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
