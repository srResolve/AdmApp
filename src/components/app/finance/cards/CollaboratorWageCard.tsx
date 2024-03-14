import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { AuthPutAPI, authDeleteAPI } from '../../../../lib/axios';
import { AnimatedButton } from '../../../global/AnimatedButton';
import { BackButton } from '../../../global/BackButton';
import { BaseButton } from '../../../global/BaseButton';
import { IconButton } from '../../../global/IconButton';
import { StatusCard } from '../../../global/StatusCard';
import UpdateValueModal from '../../../global/UpdateValueModal';
import { BankAccountSelector } from '../BankAccountSelector';
interface Props {
  item: {
    id: string;
    userName: string;
    date: Date;
    value: number;
    status: 'PENDING' | 'PAYED';
  };
  handleUpdate: () => void;
}

export function CollaboratorWageCard({ item, handleUpdate }: Props) {
  const [modal, setModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [updateValueModal, setUpdateValueModal] = useState(false);
  const [account, setAccount] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  async function handleUpdateStatus() {
    if (!account || account === '') {
      return Alert.alert('Erro', 'Selecione uma conta');
    }
    setUpdateStatusLoading(true);
    const connect = await AuthPutAPI(`/finance/wage/${item.id}`, {
      status: 'PAYED',
      duplicate: true,
      account_id: account,
    });
    console.log(connect);

    setUpdateStatusLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao atualizar o Salário');
    }
    Alert.alert('Salário atualizado com sucesso');
    setModal(false);
    return handleUpdate();
  }

  async function handleUpdateValue(data: any) {
    if (!data.value) {
      return Alert.alert('Erro', 'Insira um valor');
    }
    setUpdateLoading(true);
    const connect = await AuthPutAPI(`/finance/wage/${item.id}`, {
      value: data.value,
      duplicate: false,
    });
    setUpdateLoading(false);
    console.log(connect);

    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao atualizar o Salário');
    }

    Alert.alert('Salário atualizado com sucesso');
    setUpdateValueModal(false);
    return handleUpdate();
  }

  function handleDelete() {
    Alert.alert('Excluir', 'Tem certeza que deseja Excluir?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          setDeleteLoading(true);
          const connect = await authDeleteAPI(`/finance/wage/${item.id}`);
          setDeleteLoading(false);
          if (connect.status !== 200) {
            return Alert.alert('Erro', 'Ocorreu um erro ao excluir o Salário');
          }
          Alert.alert('Salário excluído com sucesso');
          setModal(false);
          return handleUpdate();
        },
      },
    ]);
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModal(true)}
        className="flex-row justify-between  py-4 px-1 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100"
      >
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
      </TouchableOpacity>
      <Modal visible={modal} transparent animationType="fade">
        <View className="absolute left-0 right-0 z-10  pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 top-32">
          <View className="flex-row items-center w-full justify-between pr-2">
            <BackButton onPress={() => setModal(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Detalhes</Text>
            <View className="flex-row">
              <IconButton
                onPress={() => setUpdateValueModal(true)}
                className="bg-primary_800"
                icon={<Feather name="edit" size={24} color="white" />}
              />
              <IconButton
                loading={deleteLoading}
                onPress={handleDelete}
                className="bg-red-700 ml-2"
                icon={<Feather name="trash-2" size={24} color="white" />}
              />
            </View>
          </View>
          <View className="flex-row mt-4 bg-primary_700 rounded-lg px-2 py-1 items-center">
            <View className="w-4/6">
              <Text numberOfLines={1} className="text-zinc-100 font-semibold text-lg">
                {item.userName}
              </Text>
              <Text numberOfLines={1} className="text-zinc-300 font-semibold">
                {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Text>
            </View>
            <StatusCard status={item.status} />
          </View>
          <View className="w-full px-4 items-center">
            <AnimatedButton
              title="Gerenciar Pagamento"
              open={paymentOpen}
              setOpen={setPaymentOpen}
            />
            {paymentOpen && (
              <>
                <BankAccountSelector handleSelect={setAccount} selectedValue={account} />
                <BaseButton
                  title="Realizar Pagamento"
                  titleClassName="text-lg"
                  loading={updateStatusLoading}
                  variant="confirmation"
                  className="h-12"
                  onPress={handleUpdateStatus}
                />
              </>
            )}
          </View>
          <UpdateValueModal
            loading={updateLoading}
            open={updateValueModal}
            setOpen={setUpdateValueModal}
            handleUpdate={handleUpdateValue}
          />
        </View>
        <View className="flex-1 items-center justify-center bg-gray-900 opacity-60"></View>
      </Modal>
    </>
  );
}
