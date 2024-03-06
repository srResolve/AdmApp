import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { ScheduleTableCard } from '../../components/app/schedule/ScheduleTableCard';
import { GlobalTitle } from '../../components/global/GlobalTitle';
import { TableContainer } from '../../components/global/TableContainer';
import { authGetAPI } from '../../lib/axios';
import { BudgetStatusOptions } from '../../utils/statusOptions';

export default function Schedule() {
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: '',
    type: '',
    limit: 10,
  });
  const [pages, setPages] = useState(10);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  async function handleGetServices() {
    setLoading(true);
    const connect = await authGetAPI(
      `/service?page=${filterOptions.page}&query=${filterOptions.query}&status=${filterOptions.status}&type=${filterOptions.type === 'status' ? 'name' : filterOptions.type}&limit=${filterOptions.limit}`
    );
    setLoading(false);

    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    setServices(connect.body.services);
    setPages(connect.body.pages);
  }

  useEffect(() => {
    handleGetServices();
  }, [filterOptions]);
  return (
    <View className="flex-1 items-center px-4 bg-primary_800">
      <GlobalTitle text="Clique em um orçamento para ver os detalhes, busque um orçamento específico ou crie um novo clicando em 'Novo Orçamento'." />
      <TableContainer
        title="Serviços"
        loading={loading}
        addButtonPress={() => {}}
        addButtonTitle="Novo Serviço"
        statusOptions={BudgetStatusOptions}
        pages={pages}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        icon={<FontAwesome name="cogs" size={24} color="white" />}
        setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
      >
        <FlatList
          data={services}
          className="px-2"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ScheduleTableCard item={item} />}
        />
      </TableContainer>
    </View>
  );
}
