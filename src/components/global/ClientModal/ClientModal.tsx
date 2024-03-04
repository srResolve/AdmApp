import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Text, View } from 'react-native';
import { Client } from '../../../@types/types';
import { authGetAPI } from '../../../lib/axios';
import { BackButton } from '../../global/BackButton';
import { Pagination } from '../../global/Pagination';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { IconBaseInput } from '../input/IconBaseInput';
import { ClientCard } from './ClientCard';
import { CreateClientModal } from './CreateClientModal';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedClient: Client | null;
  setSelectedClient: (client: Client) => void;
}

export function ClientModal({ open, setOpen, selectedClient, setSelectedClient }: Props) {
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientList, setClientList] = useState<Client[]>([]);
  const [createClientModal, setCreateClientModal] = useState(false);

  async function getClients() {
    setLoading(true);
    const connect = await authGetAPI(`/client?query=${searchText}&page=${currentPage}`);

    setLoading(false);
    if (connect.status !== 200) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os clientes');
      return setOpen(false);
    }
    setPages(connect.body.pages);
    setClientList(connect.body.clients);
  }

  useEffect(() => {
    if (open) {
      getClients();
    }
  }, [searchText, open, currentPage, createClientModal]);

  function handleSelectClient(client: Client) {
    setSelectedClient(client);
    setOpen(false);
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10 h-3/4 pb-2 mx-6 rounded-xl items-center  bg-primary_600 top-32">
        <View className="flex-row items-center justify-between w-full pr-2">
          <View className="flex-row">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Clientes</Text>
          </View>
          <ButtonWithIcon
            title="Novo cliente"
            className="bg-primary_800"
            onPress={() => setCreateClientModal(true)}
            icon={<AntDesign name="pluscircle" size={24} color="white" />}
          />
        </View>
        <View className="flex-1 items-center w-full px-4">
          <IconBaseInput
            error={[]}
            containerStyle="flex-row border items-center mt-4 justify-between pr-2 bg-primary_400 h-14 rounded-lg overflow-hidden border-zinc-100 w-full"
            name="search"
            placeholder="Buscar..."
            placeholderTextColor="#3f3f46"
            onChangeText={setSearchText}
            value={searchText}
            icon={<AntDesign name="search1" size={24} color="white" />}
          />
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <FlatList
              className="w-full"
              data={clientList}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ClientCard
                  client={item}
                  selectedId={selectedClient ? selectedClient.id : null}
                  onPress={() => handleSelectClient(item)}
                />
              )}
            />
          )}
          <CreateClientModal open={createClientModal} setOpen={setCreateClientModal} />

          <Pagination totalPages={pages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </View>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
