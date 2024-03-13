import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { Task } from '../../../@types/types';
import { DoubleIconButton } from '../../global/DoubleIconButton';
import { CreateTaskAndProductModal } from '../../global/TaskAndProductModal/CreateTaskAndProductModal';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
}

export function NewServiceModal({ open, setOpen, handleUpdate }: Props) {
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [services, setServices] = useState<Task[]>([]);

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 top-20 right-0 z-10  pb-8  my-14 mx-6 rounded-xl items-center  bg-primary_600">
        <View className="flex-row items-center justify-between w-full px-2">
          <DoubleIconButton
            title="Orçamentos"
            className="w-[44%]"
            titleClassName="text-sm"
            leftIcon={<MaterialIcons name="folder-copy" size={18} color="white" />}
            rightIcon={<Entypo name="chevron-down" size={22} color="white" />}
          />
          <Text className="text-zinc-100 self-center text-xl font-bold">ou</Text>
          <DoubleIconButton
            title="Clientes"
            className="w-[44%] bg-secondary_600"
            titleClassName="text-sm text-gray-600"
            leftIcon={<FontAwesome name="user" size={18} color="#4b5563" />}
            rightIcon={<Entypo name="chevron-down" size={22} color="#4b5563" />}
          />
        </View>
        <View className="p-2">
          <DoubleIconButton
            title="Serviços"
            leftIcon={<Entypo name="clipboard" size={24} color="white" />}
            onPress={() => setCreateTaskModal(true)}
            rightIcon={
              services.length === 0 ? (
                <AntDesign name="pluscircleo" size={24} color="white" />
              ) : (
                <View className="flex-row items-center ">
                  <Text className="text-sm text-zinc-300 font-bold">{services.length}</Text>
                  <MaterialIcons name="chevron-right" size={30} color="green" />
                </View>
              )
            }
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
        </View>
      </View>

      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
