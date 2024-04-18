import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { isCloseToBottom } from '../../../utils/scrollViewTrigger';
import { TableContainer } from '../../global/TableContainer';
import { CollaboratorWageCard } from './cards/CollaboratorWageCard';
import { NewCollaboratorFinanceModal } from './modal/NewCollaboratorFinanceModal';
export function CollaboratorsPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [collaboratorList, setCollaboratorList] = useState<any[]>([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    page: 1,
    query: '',
    status: 'PENDING',
    limit: 10,
    type: 'status',
  });

  async function fetchCollaborators() {
    setLoading(true);
    const connect = await authGetAPI(
      `/finance/wage?page=${filterOptions.page}&query=${filterOptions.query}&status=${filterOptions.status}&limit=${filterOptions.limit}&type=${filterOptions.type}`
    );
    setLoading(false);

    if (connect.status !== 200) {
      return Alert.alert('Erro', connect.body);
    }

    if (filterOptions.query !== '') {
      setPages(connect.body.pages);
      return setCollaboratorList(connect.body.wage);
    }
    const map = new Map();

    function addItemsToArray(arr: any[]) {
      arr.forEach((item: { id: string }) => {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      });
    }

    addItemsToArray(collaboratorList || []);
    addItemsToArray(connect.body.wage);

    setLoading(false);
    setPages(connect.body.pages);
    return setCollaboratorList(Array.from(map.values()));
  }

  useEffect(() => {
    fetchCollaborators();
  }, [filterOptions]);

  return (
    <TableContainer
      selectorOptions={[
        { label: 'Nome', value: 'name' },
        { label: 'Valor', value: 'value' },
        { label: 'Status', value: 'status' },
      ]}
      title="Contas Bancárias"
      icon={<MaterialCommunityIcons name="account-cog-outline" size={20} color="white" />}
      statusOptions={[
        {
          value: 'PENDING',
          label: 'Pendente',
        },
        {
          value: 'PAYED',
          label: 'Pago',
        },
      ]}
      filterOptions={filterOptions}
      setFilterOptions={setFilterOptions}
      addButtonTitle="Adicionar"
      addButtonPress={() => setModal(true)}
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
        {collaboratorList.map((collaborator) => (
          <CollaboratorWageCard handleUpdate={fetchCollaborators} item={collaborator} />
        ))}
        <View className="py-2 mb-4">
          {loading && <ActivityIndicator size="large" color="white" />}
        </View>
      </ScrollView>
      <NewCollaboratorFinanceModal
        open={modal}
        setOpen={setModal}
        handleUpdate={fetchCollaborators}
      />
    </TableContainer>
  );
}
