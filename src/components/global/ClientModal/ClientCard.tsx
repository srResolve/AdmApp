import { AntDesign } from '@expo/vector-icons';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
interface Props extends TouchableOpacityProps {
  client: {
    name: string;
    address: string;
    id: string;
  };
  selectedId: string | null;
}

export function ClientCard({ client, selectedId, ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`p-2 ${selectedId === client.id ? 'bg-primary_300 border border-primary_600' : 'bg-primary_200'}  mt-2 rounded-lg w-full  justify-between flex-row `}
      {...rest}
    >
      <View>
        <Text numberOfLines={1} className="text-black text-xl">
          {client.name}
        </Text>
        <Text numberOfLines={1} className="text-sm text-zinc-600">
          {client.address}
        </Text>
      </View>
      {selectedId === client.id && <AntDesign name="checkcircleo" size={24} color="green" />}
    </TouchableOpacity>
  );
}
