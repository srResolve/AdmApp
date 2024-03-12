import { FontAwesome5 } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { TableContainer } from '../../global/TableContainer';
import { NewEntranceModal } from './modal/NewEntranceModal';
export function FinancialRegister() {
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tableItems, setTableItems] = useState();
  const [modal, setModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: 'PENDING',
    limit: 10,
    type: 'status',
  });

  async function fetchTransactions() {
    setLoading(true);
    const connect = await authGetAPI(
      `/finance/transaction?page=${filterOptions.page}&query=${filterOptions.query}&status=${filterOptions.status}&limit=${filterOptions.limit}&type=${filterOptions.type}`
    );
    setLoading(false);

    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    setPages(connect.body.pages);
    setTableItems(connect.body.transactions);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TableContainer
      loading={loading}
      title="Entradas e Saídas"
      pages={pages}
      setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
      icon={<FontAwesome5 name="funnel-dollar" size={18} color="white" />}
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
      addButtonPress={() => setModal(true)}
      className="h-[55%]"
    >
      <FlatList
        data={tableItems}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100">
            <View>
              <Text className="text-zinc-100 font-semibold text-lg">{item.name}</Text>
              <Text className="text-zinc-800 font-semibold">{item.category}</Text>
            </View>
            <Text>{item.type}</Text>
            <View>
              <Text>{item.value}</Text>
            </View>
          </View>
        )}
      />
      <NewEntranceModal open={modal} setOpen={setModal} handleUpdate={fetchTransactions} />
    </TableContainer>
  );
}
