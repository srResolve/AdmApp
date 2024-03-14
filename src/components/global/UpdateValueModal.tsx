import { useForm } from 'react-hook-form';
import { Modal, View } from 'react-native';
import { BackButton } from './BackButton';
import { BaseButton } from './BaseButton';
import { InputForm } from './input/FormInput';

interface Props {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: (data: any) => void;
}

export default function UpdateValueModal({ open, setOpen, handleUpdate, loading }: Props) {
  const { control, handleSubmit } = useForm();

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10  pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 top-32">
        <View className="flex-row items-center w-full justify-between pr-2">
          <BackButton onPress={() => setOpen(false)} />
        </View>
        <InputForm error={[]} name="value" control={control} />

        <View className="w-full px-4 items-center">
          <BaseButton
            title="Atualizar Valor"
            titleClassName="text-lg"
            variant="confirmation"
            className="h-12"
            loading={loading}
            onPress={handleSubmit(handleUpdate)}
          />
        </View>
      </View>
      <View className="flex-1 items-center z-0 justify-center bg-gray-900 opacity-60" />
    </Modal>
  );
}
