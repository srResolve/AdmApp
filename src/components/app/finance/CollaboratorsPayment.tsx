import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Pagination } from '../../global/Pagination';
import { NewCollaboratorFinanceModal } from './modal/NewCollaboratorFinanceModal';
export function CollaboratorsPayment() {
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [collaboratorList, setCollaboratorList] = useState([
    {
      id: '1',
      name: 'Gabriel',
      value: 386.32,
      email: 'wHkXc@example.com',
      status: 'PENDING',
    },
    {
      id: '2',
      name: 'Gabriel',
      value: 386.32,
      email: 'wHkXc@example.com',
      status: 'PAYED',
    },
    {
      id: '3',
      name: 'Gabriel',
      value: 386.32,
      email: 'wHkXc@example.com',
      status: 'DELAYED',
    },
  ]);

  return (
    <View className="w-full h-4/6 mt-5 rounded-lg border-2 border-zinc-100 bg-primary_800 overflow-hidden">
      <View className="border-b-2 border-zinc-100 w-full px-2 bg-primary_800 rounded-lg">
        <View className="w-full justify-between flex-row items-center">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="account-cog-outline" size={20} color="white" />
            <Text className="text-zinc-100 ml-1 font-semibold text-xl">Colaboradores</Text>
          </View>
        </View>
        <View className="w-full flex-row justify-between p-2 mt-2">
          <Text className="text-zinc-100">Cliente</Text>
          <Text className="text-zinc-100">Situação</Text>
        </View>
      </View>
      <FlatList
        data={collaboratorList}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
            <View>
              <Text className="text-zinc-100 font-semibold text-lg">{item.name}</Text>
              <Text className="text-zinc-800 font-semibold">{item.email}</Text>
            </View>
            <View>
              <Text>
                {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Text>
            </View>
            <Text>{item.status}</Text>
          </View>
        )}
      />
      <View className="border-t-2 border-zinc-100 px-2 w-full justify-center items-center">
        <Pagination totalPages={pages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </View>
      <NewCollaboratorFinanceModal />
    </View>
  );
}
