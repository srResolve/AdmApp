import { FontAwesome5 } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { Budget } from '../../@types/types';
import { BudgetDetailsModal } from '../../components/app/budget/BudgetDetailsModal';
import { BudgetTableCard } from '../../components/app/budget/BudgetTableCard';
import { CreateBudgetModal } from '../../components/app/budget/CreateBudgetModal';
import { TableContainer } from '../../components/global/TableContainer';
import { authGetAPI } from '../../lib/axios';
import { createPdf } from '../../utils/htmlPdf';
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
  const [budgetDetailsModal, setBudgetDetailsModal] = useState(false);

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

  async function createPDF() {
    const file = await printToFileAsync({
      html: createPdf(data),
      base64: false,
      height: 842,
      width: 595,
    });

    await shareAsync(file.uri);
  }

  return (
    <View className="flex-1 items-center px-4 bg-primary_800">
      <View className="w-full h-32 justify-end"></View>
      <TableContainer
        addButtonPress={() => setCreateBudgetModal(true)}
        addButtonTitle="Novo Orçamento"
        statusOptions={BudgetStatusOptions}
        title="Orçamentos"
        pages={pages}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        icon={<FontAwesome5 name="clipboard-list" size={24} color="white" />}
        setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <FlatList
            data={budgets}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, zIndex: 10 }}
            className="px-2"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BudgetTableCard onPress={() => setBudgetDetailsModal(true)} item={item} />
            )}
          />
        )}
      </TableContainer>
      <CreateBudgetModal open={createBudgetModal} setOpen={setCreateBudgetModal} />
      <BudgetDetailsModal open={budgetDetailsModal} setOpen={setBudgetDetailsModal} />
    </View>
  );
}
