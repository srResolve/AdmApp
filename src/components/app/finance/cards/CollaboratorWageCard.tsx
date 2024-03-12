import moment from 'moment';
import { Text, View } from 'react-native';
import { StatusCard } from '../../../global/StatusCard';

interface Props {
  item: {
    userName: string;
    date: Date;
    value: number;
    status: 'PENDING' | 'PAYED';
  };
}

export function CollaboratorWageCard({ item }: Props) {
  return (
    <View className="flex-row justify-between  py-4 px-1 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
      <View className="w-1/3">
        <Text numberOfLines={1} className="text-zinc-100 font-semibold text-lg">
          {item.userName}
        </Text>
        <Text className="mt-1 text-zinc-700">Salário mês {moment(item.date).format('MM')}</Text>
      </View>
      <View>
        <Text className="text-zinc-300 text-base font-semibold">
          {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
      <StatusCard status={item.status} />
    </View>
  );
}
