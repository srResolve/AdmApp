import { AntDesign, Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import { ButtonWithIcon } from '../../global/ButtonWithIcon';
interface Props {
  selected: 'APPROVED' | 'REFUSED' | '';
  setSelected: (value: 'APPROVED' | 'REFUSED') => void;
}

export function EvaluateTaskSelector({ selected, setSelected }: Props) {
  return (
    <View className="flex-row w-full justify-between my-4">
      <ButtonWithIcon
        title="Aprovar"
        onPress={() => setSelected('APPROVED')}
        className={
          selected === 'APPROVED'
            ? 'bg-green-700 w-[52%]  border border-zinc-100'
            : 'bg-green-700 opacity-70'
        }
        titleClassName={selected === 'APPROVED' ? 'text-2xl ml-2' : 'text-xl ml-2'}
        icon={<AntDesign name="checkcircleo" size={24} color="white" />}
      />
      <ButtonWithIcon
        title="Recusar"
        onPress={() => setSelected('REFUSED')}
        className={
          selected === 'REFUSED'
            ? 'bg-red-700 w-[52%] border border-zinc-100'
            : 'bg-red-700 opacity-70'
        }
        titleClassName={selected === 'REFUSED' ? 'text-2xl ml-2' : 'text-xl ml-2'}
        icon={<Feather name="x-circle" size={24} color="white" />}
      />
    </View>
  );
}
