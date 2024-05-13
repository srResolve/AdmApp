import { Text, View } from 'react-native';

interface Props {
  text: string;
}

export function GlobalTitle({ text }: Props) {
  return (
    <View className="w-full justify-end items-center">
      <Text className="text-black font-bold text-2xl mt-12">Bem Vindo!</Text>
      <Text className="text-center text-zinc-300 font-semibold text-sm">{text}</Text>
    </View>
  );
}
