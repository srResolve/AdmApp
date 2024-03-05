import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Pagination } from '../../global/Pagination';
export function FinanceAccount() {
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      name: 'Banco do Brasil',
      balance: 38600.32,
      icon: 'https://pbs.twimg.com/profile_images/1716411027858862080/E-HgYn3H_400x400.jpg',
    },
    {
      id: '2',
      name: 'Caixa Econômica',
      balance: 18384.73,
      icon: 'https://i.pinimg.com/originals/ae/3d/94/ae3d9448e7a543b4ad94870b9a1dcfa9.jpg',
    },
  ]);

  return (
    <View className="w-full h-4/6 mt-5 rounded-lg border-2 border-zinc-100 bg-primary_800 overflow-hidden">
      <View className="border-b-2 border-zinc-100 w-full px-2 bg-primary_800 rounded-lg">
        <View className="w-full justify-between flex-row items-center">
          <View className="flex-row items-center">
            <FontAwesome name="bank" size={18} color="white" />
            <Text className="text-zinc-100 font-semibold text-xl ml-1">Contas Bancárias</Text>
          </View>
          <TouchableOpacity
            className="p-2 bg-green-700 rounded-lg mt-2 flex-row items-center"
            onPress={() => {}}
          >
            <AntDesign name="pluscircleo" size={18} color="white" />
            <Text className="ml-1 text-zinc-100 font-bold">Nova Conta</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row justify-between p-2 mt-2">
          <Text className="text-zinc-100">Cliente</Text>
          <Text className="text-zinc-100">Situação</Text>
        </View>
      </View>
      <FlatList
        data={accounts}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
            <View className="flex-row items-center">
              <Image className="w-10 h-10 rounded-full" source={{ uri: item.icon }} />
              <Text className="text-zinc-100 font-semibold text-lg ml-1">{item.name}</Text>
            </View>
            <Text className="text-zinc-800 font-semibold">
              {item.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        )}
      />
      <View className="border-t-2 border-zinc-100 px-2 w-full justify-center items-center">
        <Pagination totalPages={pages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </View>
    </View>
  );
}
