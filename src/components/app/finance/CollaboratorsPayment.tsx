import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { TableContainer } from '../../global/TableContainer';
import { CollaboratorWageCard } from './cards/CollaboratorWageCard';
import { NewCollaboratorFinanceModal } from './modal/NewCollaboratorFinanceModal';
export function CollaboratorsPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [collaboratorList, setCollaboratorList] = useState();
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

    setPages(connect.body.pages);
    setCollaboratorList(connect.body.wage);
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
      loading={loading}
      title="Contas Bancárias"
      pages={pages}
      setCurrentPage={(page) => setFilterOptions({ ...filterOptions, page })}
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
      <FlatList
        data={collaboratorList}
        className="px-2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollaboratorWageCard handleUpdate={fetchCollaborators} item={item} />
        )}
      />

      <NewCollaboratorFinanceModal
        open={modal}
        setOpen={setModal}
        handleUpdate={fetchCollaborators}
      />
    </TableContainer>
  );
}
