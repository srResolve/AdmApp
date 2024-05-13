import moment from 'moment';
import { Text, View } from 'react-native';

interface Props {
  item: {
    type: 'INCOME' | 'OUTCOME';
    category: string;
    description: string;
    value: number;
    date: Date;
  };
}

export function TransactionsCard({ item }: Props) {
  return (
    <View
      className={`flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border-2 border-zinc-100`}
    >
      <View className="w-1/3">
        <Text className="text-black font-semibold text-lg">{item.description}</Text>
        <Text className="text-zinc-800 font-semibold">{moment(item.date).format('DD/MM')}</Text>
      </View>
      <View className="bg-primary_600  px-2 py-1 rounded-lg items-center justify-center w-1/4">
        <Text numberOfLines={1} className="text-black font-semibold text-sm">
          {item.category}
        </Text>
      </View>
      <View>
        <Text className={`text-${item.type === 'INCOME' ? 'green-300' : 'red-700'} font-semibold`}>
          {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
    </View>
  );
}
