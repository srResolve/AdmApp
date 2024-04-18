import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { isCloseToBottom } from '../../../utils/scrollViewTrigger';
import { TableContainer } from '../../global/TableContainer';
import { FinanceScheduleCard } from './cards/FinanceScheduleCard';
import { NewScheduleModal } from './modal/NewScheduleModal';

export function FinanceSchedule() {
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scheduleItems, setScheduleItems] = useState<any[]>([]);
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
    const connect = await authGetAPI(
      `/finance/schedule/transaction?page=${filterOptions.page}&query=${filterOptions.query}&status=${filterOptions.status}&limit=${filterOptions.limit}&type=${filterOptions.type}`
    );
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

    addItemsToArray(scheduleItems);
    addItemsToArray(connect.body.transactions);

    setLoading(false);
    setPages(connect.body.pages);
    return setScheduleItems(Array.from(map.values()));
  }

  useEffect(() => {
    fetchSchedule();
  }, [filterOptions]);

  return (
    <TableContainer
      title="Entradas e Saídas"
      selectorOptions={[
        { label: 'Nome', value: 'name' },
        { label: 'Valor', value: 'value' },
        { label: 'Status', value: 'status' },
        { label: 'Entrada ou Saída', value: 'type' },
      ]}
      icon={<AntDesign name="calendar" size={18} color="white" />}
      statusOptions={
        filterOptions.type === 'status'
          ? [
              {
                label: 'Pendente',
                value: 'PENDING',
              },
              {
                label: 'Pago',
                value: 'PAYED',
              },
            ]
          : [
              {
                label: 'Entrada',
                value: 'INCOME',
              },
              {
                label: 'Saida',
                value: 'OUTCOME',
              },
            ]
      }
      filterOptions={filterOptions}
      setFilterOptions={setFilterOptions}
      addButtonTitle="Adicionar"
      addButtonPress={() => setNewScheduleModal(true)}
      className="h-[55%]"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-2"
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && pages > filterOptions.page) {
            setFilterOptions({ ...filterOptions, page: filterOptions.page + 1 });
          }
        }}
      >
        {scheduleItems.map((schedule) => (
          <FinanceScheduleCard handleUpdate={fetchSchedule} item={schedule} />
        ))}
        <View className="py-2 mb-4">
          {loading && <ActivityIndicator size="large" color="white" />}
        </View>
      </ScrollView>
      <NewScheduleModal
        open={newScheduleModal}
        setOpen={setNewScheduleModal}
        handleUpdate={fetchSchedule}
      />
    </TableContainer>
  );
}
