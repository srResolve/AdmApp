import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalTitle } from '../../components/global/GlobalTitle';
import { Pagination } from '../../components/global/Pagination';
export default function Schedule() {
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [services, setServices] = useState<any[]>([
    {
      id: '1',
      client: {
        name: 'Gabriel',
        address: 'Endereços',
      },
      status: 'PENDING',
      user: {
        name: 'Colaborador teste',
      },
      date: '10/10/2022',
      time: '10:00',
    },
    {
      id: '2',
      client: {
        name: 'Gabriel',
        address: 'Endereços',
      },
      status: 'PENDING',
      date: '10/10/2022',
      time: '10:00',
    },
  ]);
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <View className="flex-1 items-center pt-10 px-4 bg-primary_800">
      <GlobalTitle title="Agendamentos" />
      <View className="w-full h-4/6 mt-5 rounded-lg border-2 border-zinc-100 bg-primary_800 overflow-hidden">
        <View className="border-b-2 border-zinc-100 w-full px-2 bg-primary_800 rounded-lg">
          <View className="w-full justify-between flex-row items-center">
            <Text className="text-zinc-100 font-semibold text-xl">Serviços</Text>
            <TouchableOpacity
              className="p-2 bg-green-700 rounded-lg mt-2 flex-row items-center"
              onPress={() => setCreateServiceModal(true)}
            >
              <AntDesign name="pluscircleo" size={18} color="white" />
              <Text className="ml-1 text-zinc-100 font-bold">Novo Serviço</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full flex-row justify-between p-2 mt-2">
            <Text className="text-zinc-100">Cliente</Text>
            <Text className="text-zinc-100">Colaborador</Text>
            <Text className="text-zinc-100">Situação</Text>
          </View>
        </View>
        <FlatList
          data={services}
          className="px-2"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
              <View className=" w-4/6">
                <View className="flex-row items-center">
                  <AntDesign name="user" size={16} color="white" />
                  <Text className="ml-1 text-sm text-zinc-700">Cliente:</Text>
                  <Text className="ml-1 text-lg font-semibold text-zinc-100">
                    {item.client.name}
                  </Text>
                </View>
                <View className="flex-row items-center w-full">
                  <MaterialCommunityIcons name="account-cog-outline" size={16} color="white" />
                  <Text className="ml-1 text-sm text-zinc-700">Colaborador:</Text>
                  <Text
                    numberOfLines={1}
                    className=" ml-1 font-semibold text-lg text-zinc-100 flex-1 truncate"
                  >
                    {(item.user && item.user.name) || '-'}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <AntDesign name="clockcircleo" size={16} color="white" />
                  <Text className="ml-1 text-sm font-semibold text-zinc-100">
                    {item.date} - {item.time}
                  </Text>
                </View>
              </View>
              <View>
                <Text></Text>
              </View>
            </View>
          )}
        />
        <View className="border-t-2 border-zinc-100 px-2 w-full justify-center items-center">
          <Pagination totalPages={pages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </View>
      </View>
    </View>
  );
}
