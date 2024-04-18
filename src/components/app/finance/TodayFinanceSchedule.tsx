import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { isCloseToBottom } from '../../../utils/scrollViewTrigger';
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

    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    if (filterOptions.query !== '') {
      setPages(connect.body.pages);
      return setScheduleItems(connect.body.transactions);
    }

    const map = new Map();

    function addItemsToArray(arr: any[]) {
      arr.forEach((item: { id: string }) => {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      });
    }

    addItemsToArray(scheduleItems || []);
    addItemsToArray(connect.body.transactions);

    setLoading(false);
    setPages(connect.body.pages);
    return setScheduleItems(Array.from(map.values()));
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <TableContainer
      title="Agenda do dia"
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="px-2"
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && pages > filterOptions.page) {
              setFilterOptions({ ...filterOptions, page: filterOptions.page + 1 });
            }
          }}
        >
          {scheduleItems.map((budget) => (
            <FinanceScheduleCard key={budget.id} handleUpdate={fetchSchedule} item={budget} />
          ))}
          <View className="py-2 mb-4">
            {loading && <ActivityIndicator size="large" color="white" />}
          </View>
        </ScrollView>
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
