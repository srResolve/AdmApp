import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { NewServiceModal } from '../../components/app/schedule/NewServiceModal';
import { ScheduleTableCard } from '../../components/app/schedule/ScheduleTableCard';
import { PageHeader } from '../../components/global/PageHeader';
import { TableContainer } from '../../components/global/TableContainer';
import { authGetAPI } from '../../lib/axios';
import { isCloseToBottom } from '../../utils/scrollViewTrigger';
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

    if (filterOptions.query !== '') {
      setServices(connect.body.services);
      return setPages(connect.body.pages);
    }
    const map = new Map();

    function addItemsToArray(arr: any[]) {
      arr.forEach((item: { id: string }) => {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      });
    }

    addItemsToArray(services);
    addItemsToArray(connect.body.services);

    setLoading(false);
    setPages(connect.body.pages);
    return setServices(Array.from(map.values()));
  }

  useEffect(() => {
    handleGetServices();
  }, [filterOptions]);
  return (
    <View className="flex-1 items-center bg-primary_800">
      <PageHeader />
      <TableContainer
        title="Serviços"
        addButtonPress={() => setCreateServiceModal(true)}
        addButtonTitle="Novo Serviço"
        statusOptions={BudgetStatusOptions}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        icon={<FontAwesome name="cogs" size={24} color="white" />}
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
          {services.map((service) => (
            <ScheduleTableCard key={service.id} item={service} />
          ))}
          <View className="py-4 mb-8">
            {loading && <ActivityIndicator size="large" color="white" />}
          </View>
        </ScrollView>

        <NewServiceModal
          open={createServiceModal}
          setOpen={setCreateServiceModal}
          handleUpdate={handleGetServices}
        />
      </TableContainer>
    </View>
  );
}
