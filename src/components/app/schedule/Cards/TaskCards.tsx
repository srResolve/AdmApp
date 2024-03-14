import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Task } from '../../../../@types/types';
import { StatusCard } from '../../../global/StatusCard';
import { EvaluateTaskModal } from '../EvaluateTaskModal';

interface Props {
  item: Task;
  handleUpdate: () => void;
}

export function TaskCard({ item, handleUpdate }: Props) {
  const [modal, setModal] = useState(false);

  return (
    <TouchableOpacity
      className="w-full flex-row justify-between items-center mt-2 bg-primary_700 p-2 rounded-xl"
      onPress={() => setModal(true)}
    >
      <Text className="text-zinc-100 font-semibold text-lg w-3/5" numberOfLines={1}>
        {item.name}
      </Text>
      <StatusCard status={item.status} />
      <EvaluateTaskModal task={item} open={modal} setOpen={setModal} handleUpdate={handleUpdate} />
    </TouchableOpacity>
  );
}
3;
