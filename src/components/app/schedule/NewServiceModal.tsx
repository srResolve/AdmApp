import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { Client, Task } from '../../../@types/types';
import { AuthPostAPI } from '../../../lib/axios';
import { ZodCreateServiceValidation, zodErrorHandler } from '../../../lib/zod';
import { BaseButton } from '../../global/BaseButton';
import { ClientModal } from '../../global/ClientModal/ClientModal';
import { CollaboratorModal } from '../../global/CollaboratorModal/CollaboratorModal';
import { DoubleIconButton } from '../../global/DoubleIconButton';
import { CreateTaskAndProductModal } from '../../global/TaskAndProductModal/CreateTaskAndProductModal';
import { ServiceCategorySelector } from './ServiceCategorySelector';
import { ServiceDateAndTimePickerModal } from './ServiceDateAndTimePickerModal';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
}

export function NewServiceModal({ open, setOpen, handleUpdate }: Props) {
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [services, setServices] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [executionDateModal, setExecutionDateModal] = useState(false);
  const [collaboratorModal, setCollaboratorModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [executionData, setExecutionData] = useState<{
    date: Date;
    startTime: string;
    endTime: string;
  } | null>(null);
  const [collaborator, setCollaborator] = useState<{
    id: string;
    name: string;
  } | null>(null);

  async function handleCreateService() {
    try {
      const data = {
        client_id: client?.id,
        collaborator_id: collaborator?.id,
        date: executionData?.date,
        start_time: executionData?.startTime,
        end_time: executionData?.endTime,
        serviceTask: services,
        category_id: category,
      };
      const validation = ZodCreateServiceValidation.parse(data);
      setLoading(true);
      const connect = await AuthPostAPI('/service/create', validation);
      setLoading(false);

      if (connect.status !== 201 && connect.status !== 200) {
        return setErrorMessage(connect.body.message);
      }

      Alert.alert('Serviço criado com sucesso');
      setOpen(false);
      return handleUpdate();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(zodErrorHandler(error));
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 top-20 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-white">
        <View className="flex-row items-center justify-between w-full px-2">
          {/* <DoubleIconButton
            title="Orçamentos"
            className="w-[44%]"
            titleClassName="text-sm"
            leftIcon={<MaterialIcons name="folder-copy" size={18} color="black" />}
            rightIcon={<Entypo name="chevron-down" size={22} color="black" />}
          />
          <Text className="text-black self-center text-xl font-bold">ou</Text> */}
          <DoubleIconButton
            title={(client && client.name) || 'Cliente'}
            onPress={() => setClientModal(true)}
            // className="w-[44%] bg-secondary_600"
            // titleClassName="text-sm text-gray-600"
            leftIcon={<FontAwesome name="user" size={28} color="black" />}
            rightIcon={<Entypo name="chevron-down" size={28} color="black" />}
          />
        </View>
        <View className="p-2 items-center w-full">
          <DoubleIconButton
            title="Serviços"
            leftIcon={<Entypo name="clipboard" size={24} color="black" />}
            onPress={() => setCreateTaskModal(true)}
            rightIcon={
              services.length === 0 ? (
                <AntDesign name="pluscircleo" size={24} color="black" />
              ) : (
                <View className="flex-row items-center ">
                  <Text className="text-sm text-zinc-300 font-bold">{services.length}</Text>
                  <MaterialIcons name="chevron-right" size={30} color="green" />
                </View>
              )
            }
          />
          <DoubleIconButton
            leftIcon={<AntDesign name="calendar" size={24} color="black" />}
            title="Data e Hora de Execução"
            onPress={() => setExecutionDateModal(true)}
            rightIcon={
              executionData === null ? (
                <AntDesign name="pluscircleo" size={24} color="black" />
              ) : (
                <AntDesign name="checkcircleo" size={24} color="green" />
              )
            }
          />
          <ServiceCategorySelector selectedValue={category} handleSelect={setCategory} />

          <DoubleIconButton
            leftIcon={<MaterialCommunityIcons name="account-cog-outline" size={24} color="black" />}
            title="Colaborador (opcional)"
            onPress={() => setCollaboratorModal(true)}
            rightIcon={
              collaborator === null ? (
                <AntDesign name="pluscircleo" size={24} color="black" />
              ) : (
                <AntDesign name="checkcircleo" size={24} color="green" />
              )
            }
          />

          <Text className="text-sm text-red-700 font-semibold">{errorMessage}</Text>
          <BaseButton
            loading={loading}
            title="Criar Serviço"
            className="mt-2"
            onPress={handleCreateService}
            variant="confirmation"
          />
          <BaseButton title="Voltar" onPress={() => setOpen(false)} variant="base" />
          <CollaboratorModal
            handleSelect={(collaborator) => setCollaborator(collaborator)}
            selectedValue={collaborator?.id || ''}
            open={collaboratorModal}
            setOpen={setCollaboratorModal}
          />
          <CreateTaskAndProductModal
            open={createTaskModal}
            setOpen={setCreateTaskModal}
            data={services}
            title="Tarefas"
            pluralTitle="Tarefas"
            hasPrice={false}
            handleEdit={(data, index) =>
              setServices((prev) => [...prev.filter((_, i) => i !== index), data])
            }
            handleDelete={(index) => setServices((prev) => [...prev.filter((_, i) => i !== index)])}
            handleChange={(data) => setServices((prev) => [...prev, data])}
          />
          <ServiceDateAndTimePickerModal
            open={executionDateModal}
            setOpen={setExecutionDateModal}
            setExecutionTime={setExecutionData}
          />
          <ClientModal
            open={clientModal}
            setOpen={setClientModal}
            setSelectedClient={setClient}
            selectedClient={client}
          />
        </View>
      </View>

      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
