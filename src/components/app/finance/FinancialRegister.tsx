import { FontAwesome5 } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { TableContainer } from '../../global/TableContainer';
import { TransactionsCard } from './cards/TransactionsCard';
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
  }, [filterOptions]);

  return (
    <TableContainer
      loading={loading}
      selectorOptions={[
        {
          label: 'Todos',
          value: 'all',
        },
        {
          label: 'Entrada ou Saída',
          value: 'status',
        },
        // {
        //   label: 'Data',
        //   value: 'date',
        // },
        {
          label: 'Valor',
          value: 'value',
        },
        {
          label: 'Nome',
          value: 'name',
        },
      ]}
      title="Entradas e Saídas"
      pages={pages}
      setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
      icon={<FontAwesome5 name="funnel-dollar" size={18} color="white" />}
      statusOptions={[
        {
          label: 'Entradas',
          value: 'INCOME',
        },
        {
          label: 'Saídas',
          value: 'OUTCOME',
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
        renderItem={({ item }) => <TransactionsCard item={item} />}
      />
      <NewEntranceModal open={modal} setOpen={setModal} handleUpdate={fetchTransactions} />
    </TableContainer>
  );
}
