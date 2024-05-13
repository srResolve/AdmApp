import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BackButton } from './BackButton';
import { BaseButton } from './BaseButton';
import { ButtonWithIcon } from './ButtonWithIcon';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  date: Date | null;
  setDate: (date: Date) => void;
  title: string;
  placeholder: string;
}

export function DatePickerModal({ open, setOpen, date, setDate, title, placeholder }: Props) {
  const [datePicker, setDatePicker] = useState(false);

  const handleDate = (date: Date) => {
    setDate(date);
    setDatePicker(false);
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-white px-4 top-44">
        <View className="flex-row items-center w-full">
          <BackButton onPress={() => setOpen(false)} />
          <Text className="text-black self-center text-2xl font-bold">{title}</Text>
        </View>
        <ButtonWithIcon
          className=" justify-between bg-primary_400"
          titleClassName="text-xl text-primary_900  font-medium mr-4"
          orientation="right"
          onPress={() => setDatePicker(true)}
          title={date ? moment(date).format('DD/MM/YYYY') : placeholder}
          icon={<Feather name="calendar" size={28} color="white" />}
        />
        <DateTimePickerModal
          isVisible={datePicker}
          mode="date"
          isDarkModeEnabled={true}
          onConfirm={(item: Date) => handleDate(item)}
          onCancel={() => setDatePicker(false)}
        />
        <BaseButton variant="confirmation" title="Confirmar" onPress={() => setOpen(false)} />
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
