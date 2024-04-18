import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { TableContainer } from '../../global/TableContainer';
import { BankAccountCard } from './cards/BankAccountCard';
import { NewBankAccountModal } from './modal/NewBankAccountModal';
export function FinanceAccount() {
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState();
  const [modal, setModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: 'PENDING',
    limit: 10,
    type: 'status',
  });

  async function fetchAccounts() {
    setLoading(true);
    const connect = await authGetAPI(`/bank-account`);
    setLoading(false);

    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    setPages(1);
    setAccounts(connect.body.accounts);
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <TableContainer
      title="Contas Bancárias"
      filter={false}
      icon={<FontAwesome name="bank" size={18} color="white" />}
      statusOptions={[]}
      filterOptions={filterOptions}
      setFilterOptions={setFilterOptions}
      addButtonTitle="Adicionar"
      addButtonPress={() => setModal(true)}
      className="h-[55%]"
    >
      <FlatList
        data={accounts}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BankAccountCard item={item} />}
      />
      <View className="py-2 mb-4">
        {loading && <ActivityIndicator size="large" color="white" />}
      </View>
      <NewBankAccountModal open={modal} setOpen={setModal} handleUpdate={fetchAccounts} />
    </TableContainer>
  );
}
