import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { TableContainer } from '../../global/TableContainer';
import { FinanceScheduleCard } from './cards/FinanceScheduleCard';
import { NewScheduleModal } from './modal/NewScheduleModal';

export function TodayFinanceSchedule() {
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scheduleItems, setScheduleItems] = useState<any[] | undefined>();
  const [newScheduleModal, setNewScheduleModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: 'PENDING',
    limit: 10,
    type: 'status',
  });
  async function fetchSchedule() {
    setLoading(true);
    const connect = await authGetAPI('/finance/schedule/today');

    console.log(connect);

    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }
    setPages(connect.body.pages);
    setScheduleItems(connect.body.transactions);
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <TableContainer
      loading={loading}
      title="Agenda do dia"
      pages={pages}
      setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
      icon={<AntDesign name="calendar" size={18} color="white" />}
      statusOptions={[
        {
          label: 'Pendente',
          value: 'PENDING',
        },
        {
          label: 'Pago',
          value: 'PAYED',
        },
      ]}
      filterOptions={filterOptions}
      setFilterOptions={setFilterOptions}
      addButtonTitle="Adicionar"
      filter={false}
      addButtonPress={() => setNewScheduleModal(true)}
      className="h-[55%]"
    >
      {scheduleItems && scheduleItems.length > 0 ? (
        <FlatList
          data={scheduleItems}
          className="px-2"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FinanceScheduleCard handleUpdate={fetchSchedule} item={item} />
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-zinc-100 font-semibold text-lg">Nenhum item encontrado</Text>
        </View>
      )}
      <NewScheduleModal
        open={newScheduleModal}
        setOpen={setNewScheduleModal}
        handleUpdate={fetchSchedule}
      />
    </TableContainer>
  );
}
