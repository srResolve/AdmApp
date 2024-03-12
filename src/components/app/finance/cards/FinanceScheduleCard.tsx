import moment from 'moment';
import { Text, View } from 'react-native';
import { StatusCard } from '../../../global/StatusCard';

interface Props {
  item: {
    id: string;
    name: string;
    value: number;
    status: 'PENDING' | 'PAYED';
    date: Date;
    categoryName: string;
    type: 'INCOME' | 'OUTCOME';
  };
}

export function FinanceScheduleCard({ item }: Props) {
  return (
    <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
      <View className="w-1/3">
        <Text numberOfLines={1} className="text-zinc-100 font-semibold text-lg">
          {item.name}
        </Text>
        <View className="flex-row">
          <Text numberOfLines={1} className="text-zinc-700">
            {moment(item.date).format('DD/MM')}
          </Text>
          <Text numberOfLines={1} className="text-zinc-800 font-semibold">
            {' '}
            - {item.categoryName}
          </Text>
        </View>
      </View>
      <View className="w-1/3 items-center ">
        <Text
          className={`${item.type === 'INCOME' ? 'text-green-300' : 'text-red-700'} font-semibold text-base`}
        >
          {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
      <View className="max-w-1/3">
        <StatusCard status={item.status} />
      </View>
    </View>
  );
}
