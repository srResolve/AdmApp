import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Budget } from '../../@types/types';
import { BudgetTableCard } from '../../components/app/budget/BudgetTableCard';
import { CreateBudgetModal } from '../../components/app/budget/CreateBudgetModal';
import { PageHeader } from '../../components/global/PageHeader';
import { TableContainer } from '../../components/global/TableContainer';
import { authGetAPI } from '../../lib/axios';
import { isCloseToBottom } from '../../utils/scrollViewTrigger';
import { BudgetStatusOptions } from '../../utils/statusOptions';
export default function Budgets() {
  const [pages, setPages] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: '',
    type: 'name',
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [createBudgetModal, setCreateBudgetModal] = useState(false);

  useEffect(() => {
    getBudgets();
  }, [filterOptions, createBudgetModal]);

  async function getBudgets() {
    setLoading(true);
    const connect = await authGetAPI(
      `/budget?page=${filterOptions.page}&query=${filterOptions.query}&status=${filterOptions.status}&type=${filterOptions.type === 'status' ? 'name' : filterOptions.type}&limit=${filterOptions.limit}`
    );

    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    if (filterOptions.query !== '') {
      setLoading(false);
      return setBudgets(connect.body.budget);
    }
    const map = new Map();

    function addItemsToArray(arr: Budget[]) {
      arr.forEach((item: { id: string }) => {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      });
    }

    addItemsToArray(budgets);
    addItemsToArray(connect.body.budget);

    setLoading(false);
    setPages(connect.body.pages);
    return setBudgets(Array.from(map.values()));
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 items-center bg-primary_800">
        <PageHeader />

        <TableContainer
          selectorOptions={[
            // {
            //   label: 'Todos',
            //   value: 'all',
            // },
            // {
            //   label: 'Status',
            //   value: 'status',
            // },
            // {
            //   label: 'Código',
            //   value: 'code',
            // },
            {
              label: 'Nome',
              value: 'name',
            },
            // {
            //   label: 'Valor',
            //   value: 'value',
            // },
          ]}
          addButtonPress={() => setCreateBudgetModal(true)}
          addButtonTitle="Novo Orçamento"
          statusOptions={BudgetStatusOptions}
          title="Orçamentos"
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          icon={<FontAwesome5 name="clipboard-list" size={24} color="white" />}
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
            {budgets.map((budget) => (
              <BudgetTableCard key={budget.id} item={budget} handleUpdate={getBudgets} />
            ))}
            <View className="py-2 mb-4">
              {loading && <ActivityIndicator size="large" color="white" />}
            </View>
          </ScrollView>
        </TableContainer>
        <CreateBudgetModal open={createBudgetModal} setOpen={setCreateBudgetModal} />
      </View>
    </TouchableWithoutFeedback>
  );
}
