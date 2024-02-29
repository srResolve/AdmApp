import { Text, View } from 'react-native';

interface Props {
  title: string;
}

export function GlobalTitle({ title }: Props) {
  return (
    <View className="w-full px-4 mt-24">
      <Text className="text-zinc-50 font-bold text-2xl">{title}</Text>
    </View>
  );
}
