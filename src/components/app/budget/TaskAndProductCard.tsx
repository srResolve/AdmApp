import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { IconButton } from '../../global/IconButton';

interface Props {
  item: {
    name: string;
    quantity: number;
    value: number;
  };
  handleDelete: () => void;
  handleEdit: () => void;
}

export function TaskAndProductCard({ item, handleDelete, handleEdit }: Props) {
  return (
    <View className="flex-row justify-between px-3 mt-1 bg-primary_200 p-2 rounded-lg w-full">
      <View className="gap-1 w-3/5">
        <Text numberOfLines={1} className="text-zinc-900 font-semibold text-xl truncate w-full">
          {item.name}
        </Text>
        <View className="flex-row items-center justify-between w-1/2">
          <IconButton
            onPress={handleDelete}
            icon={<Feather name="trash-2" size={22} color="#ef4444" />}
          />
          <IconButton
            onPress={handleEdit}
            icon={<Feather name="edit" size={22} color="#eab308" />}
          />
        </View>
      </View>
      <View>
        <View className="flex-row items-center ">
          <Text className="text-lg text-zinc-700">{item.quantity} x </Text>
          <Text className="text-lg text-green-700 font-semibold">
            {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
        <Text className="mt-2 text-sm text-zinc-700 self-end">
          Total:
          {(item.value * item.quantity).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </View>
    </View>
  );
}
