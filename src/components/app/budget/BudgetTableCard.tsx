import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { StatusCard } from '../../global/StatusCard';

interface Props extends TouchableOpacityProps {
  item: {
    client: {
      name: string;
      address: string;
    };
    status: 'PENDING' | 'APPROVED' | 'REFUSED' | 'COMPLETE';
  };
}

export function BudgetTableCard({ item, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100"
      {...rest}
    >
      <View className="w-4/6">
        <Text numberOfLines={1} className="text-zinc-100 font-semibold text-lg">
          {item.client.name}
        </Text>
        <Text numberOfLines={1} className="text-zinc-800 font-semibold">
          {item.client.address}
        </Text>
      </View>
      <StatusCard status={item.status} />
    </TouchableOpacity>
  );
}
