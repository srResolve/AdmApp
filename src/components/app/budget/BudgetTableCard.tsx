import { useState } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { StatusCard } from '../../global/StatusCard';
import { BudgetDetailsModal } from './BudgetDetailsModal';

interface Props extends TouchableOpacityProps {
  item: {
    client: {
      name: string;
      address: string;
    };
    status: 'PENDING' | 'APPROVED' | 'REFUSED' | 'COMPLETE';
  };
  handleUpdate: () => void;
}

export function BudgetTableCard({ item, handleUpdate, ...rest }: Props) {
  const [budgetDetailsModal, setBudgetDetailsModal] = useState(false);

  return (
    <TouchableOpacity
      className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100"
      onPress={() => setBudgetDetailsModal(true)}
      {...rest}
    >
      <View className="w-4/6">
        <Text numberOfLines={1} className="text-black font-semibold text-lg">
          {item.client.name}
        </Text>
        <Text numberOfLines={1} className="text-zinc-800 font-semibold">
          {item.client.address}
        </Text>
      </View>
      <StatusCard status={item.status} />
      <BudgetDetailsModal
        open={budgetDetailsModal}
        setOpen={setBudgetDetailsModal}
        handleUpdate={handleUpdate}
        budget={item}
      />
    </TouchableOpacity>
  );
}
