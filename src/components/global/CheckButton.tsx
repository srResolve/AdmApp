import { AntDesign } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
}

export function CheckButton({ checked, onChange, title }: Props) {
  return (
    <View className="flex-row items-center w-full mt-4">
      <TouchableOpacity
        className="w-6 h-6 bg-zinc-100 rounded-full items-center justify-center"
        onPress={() => onChange(!checked)}
      >
        {checked ? <AntDesign name="check" size={24} color="green" /> : null}
      </TouchableOpacity>
      <Text className="ml-2 text-lg text-zinc-100 font-semibold">{title}</Text>
    </View>
  );
}
