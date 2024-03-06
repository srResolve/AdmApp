import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { Budget } from '../../@types/types';
import { BudgetTableCard } from '../../components/app/budget/BudgetTableCard';
import { CreateBudgetModal } from '../../components/app/budget/CreateBudgetModal';
import { GlobalTitle } from '../../components/global/GlobalTitle';
import { TableContainer } from '../../components/global/TableContainer';
import { authGetAPI } from '../../lib/axios';
import { BudgetStatusOptions } from '../../utils/statusOptions';
export default function Budgets() {
  const [pages, setPages] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: '',
    type: '',
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [createBudgetModal, setCreateBudgetModal] = useState(false);

  useEffect(() => {
    getBudgets();
  }, [filterOptions]);

  async function getBudgets() {
    setLoading(true);
    const connect = await authGetAPI(
      `/budget?page=${filterOptions.page}&query=${filterOptions.query}&status=${filterOptions.status}&type=${filterOptions.type === 'status' ? 'name' : filterOptions.type}&limit=${filterOptions.limit}`
    );

    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    setBudgets(connect.body.budget);
    setPages(connect.body.pages);
  }

  return (
    <View className="flex-1 items-center px-4 bg-primary_800">
      <GlobalTitle text="Clique em um orçamento para ver os detalhes, busque um orçamento específico ou crie um novo clicando em 'Novo Orçamento'." />
      <TableContainer
        addButtonPress={() => setCreateBudgetModal(true)}
        addButtonTitle="Novo Orçamento"
        statusOptions={BudgetStatusOptions}
        title="Orçamentos"
        pages={pages}
        loading={loading}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        icon={<FontAwesome5 name="clipboard-list" size={24} color="white" />}
        setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
      >
        <FlatList
          data={budgets}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, zIndex: 10 }}
          className="px-2"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BudgetTableCard item={item} handleUpdate={getBudgets} />}
        />
      </TableContainer>
      <CreateBudgetModal open={createBudgetModal} setOpen={setCreateBudgetModal} />
    </View>
  );
}
