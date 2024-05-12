import { Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { CreateBudgetModal } from '../../components/app/budget/CreateBudgetModal';
import { NewEntranceModal } from '../../components/app/finance/modal/NewEntranceModal';
import { NewServiceModal } from '../../components/app/schedule/NewServiceModal';
import { ButtonWithIcon } from '../../components/global/ButtonWithIcon';
import { ButtonWithIconAndDescription } from '../../components/global/ButtonWithIconAndDescription';
import { ClientModal } from '../../components/global/ClientModal/ClientModal';
import { PageHeader } from '../../components/global/PageHeader';
export function Home() {
  const [createBudgetModal, setCreateBudgetModal] = useState(false);
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [newEntranceModal, setNewEntranceModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);

  return (
    <View className="flex-1 items-center  bg-primary_800">
      <PageHeader title="Bem vindo!" />
      <ButtonWithIconAndDescription
        title="Criar novo orçamento"
        subtitle="Crie novos orçamentos para seus clientes"
        titleClassName="text-lg ml-4"
        subtitleClassName="ml-4"
        className="w-11/12 mt-5 bg-primary_700 py-4"
        onPress={() => setCreateBudgetModal(true)}
        icon={<FontAwesome5 name="file-contract" size={32} color="white" />}
      />
      <ButtonWithIconAndDescription
        title="Nova Ordem de Serviço"
        subtitle="Crie uma nova ordem de serviço"
        subtitleClassName="ml-4"
        titleClassName="text-lg ml-4"
        onPress={() => setCreateServiceModal(true)}
        className="w-11/12 bg-primary_600 mt-4 py-4"
        icon={<FontAwesome6 name="toolbox" size={32} color="white" />}
      />
      <View className="w-full ml-10 mt-4">
        <Text className="text-zinc-100 text-xl font-bold mt-4">Atalhos</Text>
      </View>
      <View className="w-full flex-row justify-around mt-4">
        <ButtonWithIcon
          title="Nova Entrada"
          onPress={() => setNewEntranceModal(true)}
          titleClassName="text-lg mt-2 text-center text-zinc-800 "
          className="w-40 mt-5 bg-zinc-200 flex-col items-start"
          icon={<FontAwesome6 name="sack-dollar" size={38} color="#084f09" />}
        />
        <ButtonWithIcon
          title="Clientes"
          onPress={() => setClientModal(true)}
          titleClassName="text-lg mt-2 text-center text-zinc-800 "
          className="w-40 mt-5 bg-zinc-200 flex-col items-start"
          icon={<Feather name="user" size={38} color="black" />}
        />
      </View>

      <CreateBudgetModal open={createBudgetModal} setOpen={setCreateBudgetModal} />
      <NewServiceModal
        open={createServiceModal}
        setOpen={setCreateServiceModal}
        handleUpdate={() => {}}
      />
      <NewEntranceModal
        open={newEntranceModal}
        setOpen={setNewEntranceModal}
        handleUpdate={() => {}}
      />
      <ClientModal
        open={clientModal}
        setOpen={setClientModal}
        setSelectedClient={() => {}}
        selectedClient={null}
      />
    </View>
  );
}
