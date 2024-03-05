import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function BudgetDetailsModal({ open, setOpen }: Props) {
  return (
    <Modal visible={open} transparent>
      <View>
        <>
          <View className="absolute left-0 top-20 right-0 z-10 h-3/6 pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600 px-4">
            <Text className="text-zinc-100 text-2xl font-bold self-start">Ações:</Text>
            <TouchableOpacity className="bg-yellow-500 flex-row  rounded-lg px-2 py-1 items-center mt-2">
              <Feather name="share" size={28} color="white" />
              <Text className="text-zinc-100 self-center text-3xl font-bold ml-2 ">
                Compartilhar
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-evenly w-full mt-4 ">
              <TouchableOpacity className="bg-primary_800 flex-row rounded-lg px-2 py-1">
                <Feather name="edit" size={24} color="white" />
                <Text className="text-zinc-100 self-center text-lg font-bold"> Editar </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-red-600 flex-row rounded-lg px-2 py-1">
                <Feather name="trash-2" size={24} color="white" />
                <Text className="text-zinc-100 self-center text-lg font-bold"> Excluir </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-zinc-100 self-center text-2xl font-bold mt-4">Status</Text>

            <View className="flex-row justify-between w-full mt-4 ">
              <TouchableOpacity className="bg-green-600 flex-row rounded-lg px-2 py-1 items-center">
                <Feather name="check-circle" size={24} color="white" />
                <Text className="text-zinc-100 self-center text-2xl font-bold">Aceito</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-600 flex-row rounded-lg px-2 py-1 items-center">
                <Entypo name="block" size={24} color="white" />
                <Text className="text-zinc-100 self-center text-2xl font-bold">Recusado</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between w-full mt-4 ">
              <TouchableOpacity className="bg-primary_800 flex-row rounded-lg px-2 py-1 items-center">
                <Feather name="dollar-sign" size={24} color="white" />
                <Text className="text-zinc-100 self-center text-2xl font-bold">Pago</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-green-600 flex-row rounded-lg px-2 py-1 items-center">
                <Ionicons name="checkmark-done" size={24} color="white" />
                <Text className="text-zinc-100 self-center text-2xl font-bold">
                  Serv. Realizado
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex 1 bg-zinc-900 h-full opacity-90" />
        </>
      </View>
    </Modal>
  );
}
