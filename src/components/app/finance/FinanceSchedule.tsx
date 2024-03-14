import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { TableContainer } from '../../global/TableContainer';
import { FinanceScheduleCard } from './cards/FinanceScheduleCard';
import { NewScheduleModal } from './modal/NewScheduleModal';

export function FinanceSchedule() {
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scheduleItems, setScheduleItems] = useState();
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

    setPages(connect.body.pages);
    setScheduleItems(connect.body.transactions);
  }

  useEffect(() => {
    fetchSchedule();
  }, [filterOptions]);

  return (
    <TableContainer
      loading={loading}
      title="Entradas e Saídas"
      pages={pages}
      selectorOptions={[
        { label: 'Nome', value: 'name' },
        { label: 'Valor', value: 'value' },
        { label: 'Status', value: 'status' },
        { label: 'Entrada ou Saída', value: 'type' },
      ]}
      setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
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
      <FlatList
        data={scheduleItems}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FinanceScheduleCard handleUpdate={fetchSchedule} item={item} />}
      />
      <NewScheduleModal
        open={newScheduleModal}
        setOpen={setNewScheduleModal}
        handleUpdate={fetchSchedule}
      />
    </TableContainer>
  );
}
