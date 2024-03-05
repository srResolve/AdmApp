import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Pagination } from '../../global/Pagination';

export function FinanceSchedule() {
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <View className="w-full h-4/6 mt-5 rounded-lg border-2 border-zinc-100 bg-primary_800 overflow-hidden">
      <View className="border-b-2 border-zinc-100 w-full px-2 bg-primary_800 rounded-lg">
        <View className="w-full justify-between flex-row items-center">
          <View className="flex-row items-center">
            <AntDesign name="calendar" size={22} color="white" />
            <Text className="text-zinc-100 font-semibold text-xl ml-1">
              Entradas e saídas {'\n'} Agendadas
            </Text>
          </View>
          <TouchableOpacity
            className="p-2 bg-green-700 rounded-lg mt-2 flex-row items-center"
            onPress={() => {}}
          >
            <AntDesign name="pluscircleo" size={18} color="white" />
            <Text className="ml-1 text-zinc-100 font-bold">Novo Lançamento</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row justify-between p-2 mt-2">
          <Text className="text-zinc-100">Cliente</Text>
          <Text className="text-zinc-100">Situação</Text>
        </View>
      </View>
      <FlatList
        data={[]}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
            <View>
              <Text className="text-zinc-100 font-semibold text-lg">{item.client.name}</Text>
              <Text className="text-zinc-800 font-semibold">{item.client.address}</Text>
            </View>
            <View>
              <Text>{item.status}</Text>
            </View>
          </View>
        )}
      />
      <View className="border-t-2 border-zinc-100 px-2 w-full justify-center items-center">
        <Pagination totalPages={pages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </View>
    </View>
  );
}
