import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ButtonWithIcon } from "./ButtonWithIcon";
import moment from "moment";
interface Props {
    date: Date | null;
    setDate: (date: Date) => void;
  }

export function DatePickerButton ({ date, setDate }: Props) {
    const [datePicker, setDatePicker] = useState(false);

  const handleDate = (date: Date) => {
    setDate(date);
    setDatePicker(false);
  };

    return (
        <>
        <ButtonWithIcon
          className=" justify-between bg-primary_400  h-14 border-zinc-100 border items-center"
          titleClassName="text-xl mr-4"
          orientation="right"
          onPress={() => setDatePicker(true)}
          title={date ? moment(date).format('DD/MM') : 'Data'}
          icon={<Feather name="calendar" size={28} color="white" />}
        />
        <DateTimePickerModal
          isVisible={datePicker}
          mode="date"
          isDarkModeEnabled={true}
          onConfirm={(item: Date) => handleDate(item)}
          onCancel={() => setDatePicker(false)}
        />
        </>
    )
}