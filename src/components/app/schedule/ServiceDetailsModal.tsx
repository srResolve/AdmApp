import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Text, View } from 'react-native';
import { AuthPostAPI, authDeleteAPI, authGetAPI } from '../../../lib/axios';
import { AnimatedButton } from '../../global/AnimatedButton';
import { BackButton } from '../../global/BackButton';
import { StatusCard } from '../../global/StatusCard';
import { TaskCard } from './Cards/TaskCards';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  service: any;
  handleUpdate: () => void;
}

export function ServiceDetailsModal({ open, setOpen, service, handleUpdate }: Props) {
  const [serviceDetails, setServiceDetails] = useState(service);
  const [status, setStatus] = useState(service.status);
  const [evaluation, setEvaluation] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateServiceModal, setUpdateServiceModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDeleteService() {
    Alert.alert('Excluir', 'Deseja excluir o orçamento?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          setDeleteLoading(true);
          const connect = await authDeleteAPI(`/budget/${service.id}`);
          setDeleteLoading(false);
          if (connect.status !== 200) {
            return Alert.alert('Erro', 'Ocorreu um erro ao excluir o orçamento');
          }

          Alert.alert('Orçamento excluído com sucesso');
          setOpen(false);
          return handleUpdate();
        },
      },
    ]);
  }
  async function handleEvaluation() {
    setLoading(true);
    const connect = await AuthPostAPI(`/service/review/${service.id}`, {});
    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao avaliar a tarefa');
    }

    const details = await authGetAPI(`/service/${service.id}`);
    if (details.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao buscar os detalhes da tarefa');
    }
    setServiceDetails(details.body.service);
    setStatus(details.body.service.status);
    setEvaluation(true);
  }

  return (
    <Modal visible={open} transparent>
      <View>
        <>
          <View className="absolute left-0 top-20 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-primary_600">
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <>
                <View className="flex-row items-center justify-between pr-4 w-full">
                  <View className="flex-row items-center">
                    <BackButton onPress={() => setOpen(false)} />
                    <Text className="text-black self-center text-2xl font-bold">Detalhes</Text>
                  </View>
                  <View className="flex-row">
                    {/* <IconButton
                      onPress={() => setUpdateServiceModal(true)}
                      className="bg-primary_800"
                      icon={<Feather name="edit" size={24} color="white" />}
                    />
                    <IconButton
                      loading={deleteLoading}
                      onPress={handleDeleteService}
                      className="bg-red-700 ml-4"
                      icon={<Feather name="trash-2" size={24} color="white" />}
                    /> */}
                  </View>
                </View>
                <View className="px-4 w-full items-center">
                  <View className="flex-row mt-4 bg-primary_700 rounded-lg px-2 py-1 items-center">
                    <View className="w-4/6">
                      <Text numberOfLines={1} className="text-black font-semibold text-lg">
                        {serviceDetails.client.name}
                      </Text>
                      <Text numberOfLines={1} className="text-zinc-300 font-semibold">
                        {serviceDetails.client.address}
                      </Text>
                    </View>
                    <StatusCard status={serviceDetails.status} />
                  </View>
                </View>
                {status === 'FINISHED' && (
                  <View className="w-full px-4 items-center">
                    <AnimatedButton
                      open={evaluation}
                      title="Avaliar Tarefas"
                      setOpen={setEvaluation}
                    />
                    {evaluation && (
                      <View className="w-full items-center">
                        <FlatList
                          data={serviceDetails.service_task}
                          renderItem={({ item }) => (
                            <TaskCard item={item} handleUpdate={handleEvaluation} />
                          )}
                        />
                      </View>
                    )}
                  </View>
                )}
                {/* <UpdateBudgetModal
              handleUpdate={handleUpdate}
              open={updateBudgetModal}
              setOpen={setUpdateBudgetModal}
              budget={budget}
            /> */}
              </>
            )}
          </View>
          <View className="flex 1 bg-zinc-900 h-full opacity-90" />
        </>
      </View>
    </Modal>
  );
}
