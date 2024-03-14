import { useState } from 'react';
import { Keyboard, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { timeMask } from '../../../utils/masks';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { DatePickerButton } from '../../global/DatePickerButton';
import { BaseInput } from '../../global/input/BaseInput';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setExecutionTime: (
    executionTime: { date: Date; startTime: string; endTime: string } | null
  ) => void;
}

export function ServiceDateAndTimePickerModal({ open, setOpen, setExecutionTime }: Props) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  function handleUpdate() {
    if (!date || !time) return setOpen(false);
    setExecutionTime({ date: date, startTime: time, endTime: '18:00' });
    setOpen(false);
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="absolute left-0 top-20 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-primary_600">
          <View className="flex-row items-center w-full">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Data e Hora</Text>
          </View>
          <View className="flex-row items-center w-full px-4 justify-between">
            <BaseInput
              containerStyle="w-[48%] mt-2"
              name="time"
              placeholder="Horário"
              error={[]}
              value={time}
              onChangeText={(text) => setTime(timeMask(text))}
              autoCapitalize="none"
              keyboardType="numeric"
              maxLength={5}
            />
            <DatePickerButton date={date} setDate={setDate} />
          </View>
          <BaseButton title="Confirmar" variant="confirmation" onPress={handleUpdate} />
        </View>
      </TouchableWithoutFeedback>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
