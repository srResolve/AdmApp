import { Feather } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { AuthPutAPI, authDeleteAPI } from '../../../lib/axios';
import { createPdf } from '../../../utils/htmlPdf';
import { BudgetStatusOptions } from '../../../utils/statusOptions';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { ButtonWithIcon } from '../../global/ButtonWithIcon';
import { IconButton } from '../../global/IconButton';
import { Selector } from '../../global/Selector';
import { StatusCard } from '../../global/StatusCard';
import { UpdateBudgetModal } from './UpdateBudgetModal';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget: any;
  handleUpdate: () => void;
}

export function BudgetDetailsModal({ open, setOpen, budget, handleUpdate }: Props) {
  const [status, setStatus] = useState(budget.status);
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateBudgetModal, setUpdateBudgetModal] = useState(false);

  async function handleUpdateStatus() {
    setStatusLoading(true);
    const connect = await AuthPutAPI(`/budget/status/${budget.id}?status=${status}`, {});
    setStatusLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao atualizar o orçamento');
    }

    Alert.alert('Status atualizado com sucesso');
    setOpen(false);
    return handleUpdate();
  }

  async function handleDeleteBudget() {
    Alert.alert('Excluir', 'Deseja excluir o orçamento?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          setDeleteLoading(true);
          const connect = await authDeleteAPI(`/budget/${budget.id}`);
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

  async function handleCreatePdf() {
    const file = await printToFileAsync({
      html: createPdf(budget),
      base64: false,
      height: 842,
      width: 595,
    });
    await shareAsync(file.uri);
  }

  return (
    <Modal visible={open} transparent>
      <View>
        <>
          <View className="absolute left-0 top-20 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-primary_600">
            <View className="flex-row items-center justify-between pr-4 w-full">
              <View className="flex-row items-center">
                <BackButton onPress={() => setOpen(false)} />
                <Text className="text-black self-center text-2xl font-bold">Detalhes</Text>
              </View>
              <View className="flex-row">
                <IconButton
                  onPress={() => setUpdateBudgetModal(true)}
                  className="bg-primary_800"
                  icon={<Feather name="edit" size={24} color="white" />}
                />
                <IconButton
                  loading={deleteLoading}
                  onPress={handleDeleteBudget}
                  className="bg-red-700 ml-4"
                  icon={<Feather name="trash-2" size={24} color="white" />}
                />
              </View>
            </View>
            <View className="px-4 w-full items-center">
              <View className="flex-row mt-4 bg-primary_700 rounded-lg px-2 py-1 items-center">
                <View className="w-4/6">
                  <Text numberOfLines={1} className="text-black font-semibold text-lg">
                    {budget.client.name}
                  </Text>
                  <Text numberOfLines={1} className="text-zinc-300 font-semibold">
                    {budget.client.address}
                  </Text>
                </View>
                <StatusCard status={budget.status} />
              </View>
              <ButtonWithIcon
                title="Gerar PDF"
                titleClassName="text-2xl"
                onPress={handleCreatePdf}
                className="bg-primary_400 px-4 border border-zinc-100 mt-4"
                icon={<Feather name="share" size={28} color="white" />}
              />

              <Text className="text-black self-center text-2xl font-bold mt-4">
                Atualizar Status
              </Text>
              <View className="w-3/4">
                <Selector
                  options={BudgetStatusOptions}
                  handleSelect={(item: string) => setStatus(item)}
                  selectedValue={status}
                />
              </View>
              {status !== budget.status && (
                <BaseButton
                  title="Atualizar Status"
                  variant="confirmation"
                  onPress={handleUpdateStatus}
                  loading={statusLoading}
                />
              )}
            </View>
            <UpdateBudgetModal
              handleUpdate={handleUpdate}
              open={updateBudgetModal}
              setOpen={setUpdateBudgetModal}
              budget={budget}
            />
          </View>
          <View className="flex 1 bg-zinc-900 h-full opacity-90" />
        </>
      </View>
    </Modal>
  );
}
