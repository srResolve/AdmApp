import { Modal, Text, View } from 'react-native';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { BaseInput } from '../../global/input/BaseInput';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  observation: string | undefined;
  setObservation: (observation: string) => void;
}

export function ObservationModal({ open, setOpen, observation, setObservation }: Props) {
  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10 h-2/4 pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 px-4 top-32">
        <View className="flex-row items-center w-full">
          <BackButton onPress={() => setOpen(false)} />
          <Text className="text-zinc-100 self-center text-2xl font-bold">Observação</Text>
        </View>
        <BaseInput
          error={[]}
          name="observation"
          textAlignVertical="top"
          onChangeText={setObservation}
          value={observation}
          containerStyle="w-full h-2/4"
          multiline
          placeholder="Adicione aqui alguma observação ou descrição necessária para a prestação do serviço em questão."
          className="text-justify"
        />
        <BaseButton
          title="Atualizar Observação"
          variant="confirmation"
          className="self-center mt-8 w-full"
          onPress={() => setOpen(false)}
        />
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
