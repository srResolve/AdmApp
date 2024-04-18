import { Image, Text, View } from 'react-native';

interface Props {
  title?: string;
}

export function PageHeader({ title }: Props) {
  return (
    <>
      <Image source={require('../../../assets/logoYellow.png')} className="h-20 w-[53%]  mt-10" />
      <View className="w-full ml-10 mt-6">
        {title && <Text className="text-zinc-100 text-2xl font-bold mt-4">{title}</Text>}
      </View>
    </>
  );
}
