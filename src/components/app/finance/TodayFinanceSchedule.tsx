import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { StatusCard } from '../../global/StatusCard';
import { TableContainer } from '../../global/TableContainer';
import { NewScheduleModal } from './modal/NewScheduleModal';

export function TodayFinanceSchedule() {
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: '1',
      name: 'Conta de Energia',
      value: 386.32,
      status: 'PENDING',
    },
    {
      id: '2',
      name: 'Conta de Energia',
      value: 386.32,
      status: 'PAYED',
    },
    {
      id: '3',
      name: 'Conta de Energia',
      value: 386.32,
      status: 'PAYED',
    },
  ]);

  return (
    <TableContainer
      title="Agenda do dia"
      pages={pages}
      setCurrentPage={setCurrentPage}
      icon={<AntDesign name="calendar" size={18} color="white" />}
      statusOptions={[
        {
          label: 'Pendente',
          value: 'PENDING',
        },
      ]}
      filterOptions={{
        page: currentPage,
        query: '',
        status: 'PENDING',
        limit: 10,
        type: 'status',
      }}
      setFilterOptions={() => {}}
      addButtonTitle="Adicionar"
      addButtonPress={() => {}}
      className="h-[55%]"
    >
      <FlatList
        data={scheduleItems}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
            <View>
              <Text className="text-zinc-100 font-semibold text-lg">{item.name}</Text>
              <Text className="text-green-900 font-semibold text-lg">
                {item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </Text>
            </View>
            <StatusCard status={item.status} />
          </View>
        )}
      />
      <NewScheduleModal />
    </TableContainer>
  );
}
