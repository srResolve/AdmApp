import { Image, Text, View } from 'react-native';
import { bankList } from '../../../../utils/banks';

interface Props {
  item: {
    name: string;
    balance: number;
  };
}

export function BankAccountCard({ item }: Props) {
  return (
    <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
      <View className="flex-row items-center">
        <View className="bg-primary_200 rounded-full w-12 h-12 items-center justify-center">
          <Image className="w-10 h-10  " source={{ uri: bankList[item.name] || '' }} />
        </View>
        <Text className="text-zinc-100 font-semibold text-xl ml-2">{item.name}</Text>
      </View>
      <Text className="text-green-800 text-lg font-semibold">
        {item.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </View>
  );
}
