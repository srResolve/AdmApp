import { Modal, Text, View } from 'react-native';
import { BackButton } from './BackButton';
import * as Button from './Button';
import { BaseInput } from './input/BaseInput';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  date: string;
  setDate: (date: string) => void;
  title: string;
  placeholder: string;
}

export function DatePickerModal({ open, setOpen, date, setDate, title, placeholder }: Props) {
  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10 h-2/6 pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 px-4 top-44">
        <View className="flex-row items-center w-full">
          <BackButton onPress={() => setOpen(false)} />
          <Text className="text-zinc-100 self-center text-2xl font-bold">{title}</Text>
        </View>
        <BaseInput
          error={[]}
          name="observation"
          onChangeText={setDate}
          value={date}
          containerStyle="w-full"
          placeholder={placeholder}
        />
        <Button.Root
          onPress={() => setOpen(false)}
          className="self-center mt-8"
          variant="confirmation"
        >
          <Button.Title title="Atualizar" />
        </Button.Root>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
