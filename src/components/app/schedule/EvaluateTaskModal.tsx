import { useState } from 'react';
import { Alert, FlatList, Image, Modal, Text, View } from 'react-native';
import { Task } from '../../../@types/types';
import { AuthPostAPI } from '../../../lib/axios';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { BaseInput } from '../../global/input/BaseInput';
import { EvaluateTaskSelector } from './EvaluateTaskSelector';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
  handleUpdate: () => void;
}

export function EvaluateTaskModal({ open, setOpen, task, handleUpdate }: Props) {
  const [selected, setSelected] = useState<'APPROVED' | 'REFUSED' | ''>('');
  const [evaluation, setEvaluation] = useState(task.evaluation || '');
  const [loading, setLoading] = useState(false);
  async function handleUpdateTask() {
    if (!selected) {
      return Alert.alert('Erro', 'Selecione o status da tarefa');
    }
    setLoading(true);
    const connect = await AuthPostAPI(`/service/task/validate/${task.id}?status=${selected}`, {
      evaluation,
    });
    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao atualizar a tarefa');
    }

    Alert.alert('Tarefa avaliada com sucesso');
    setOpen(false);
    return handleUpdate();
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <>
        <View className="absolute left-0 top-20 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-primary_600">
          <View className=" items-center pr-4 w-full">
            <View className="flex-row items-center pr-4 w-full">
              <BackButton onPress={() => setOpen(false)} />
              <Text className="text-black self-center text-2xl font-bold">Detalhes</Text>
            </View>
          </View>
          <View className="bg-primary_400 rounded-lg border border-zinc-100 px-4">
            <Text className="text-black font-semibold text-xl">{task.name}</Text>
          </View>
          <FlatList
            data={task.photo}
            horizontal
            className="w-full mt-4 px-2"
            keyExtractor={(item) => item.photo_key}
            renderItem={({ item }) => (
              <Image
                className="rounded-lg h-40 w-24 ml-2 border border-zinc-100"
                source={{ uri: item.photo_location }}
              />
            )}
          />
          <View className="px-4 w-full items-center">
            <EvaluateTaskSelector selected={selected} setSelected={setSelected} />
            <BaseInput
              name="evaluation"
              error={[]}
              placeholder="avaliação"
              multiline={true}
              textAlignVertical="top"
              containerStyle="mt-4 w-full h-24"
              value={evaluation}
              onChangeText={setEvaluation}
            />
            <BaseButton
              loading={loading}
              title="Avaliar"
              variant="confirmation"
              onPress={handleUpdateTask}
            />
          </View>
        </View>
        <View className="flex 1 bg-zinc-900 h-full opacity-90" />
      </>
    </Modal>
  );
}
