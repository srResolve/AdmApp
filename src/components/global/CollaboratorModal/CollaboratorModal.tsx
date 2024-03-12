import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { BackButton } from '../BackButton';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: string;
  handleSelect: (value: { name: string; id: string }) => void;
}
export function CollaboratorModal({ open, setOpen, selectedValue, handleSelect }: Props) {
  const [loading, setLoading] = useState(false);
  const [collaborators, setCollaborators] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      async function getCollaborators() {
        setLoading(true);
        const connect = await authGetAPI('/user');
        setLoading(false);
        setCollaborators(connect.body.users);
      }
      getCollaborators();
    }
  }, [open]);

  return (
    <Modal visible={open} animationType="slide" transparent>
      <View className="absolute left-0 right-0 z-10  pb-2 mx-6 rounded-xl items-center  bg-primary_600 top-24 h-[70%]">
        <View className="flex-row items-center w-full">
          <BackButton onPress={() => setOpen(false)} />
          <Text className="text-zinc-100 self-center text-2xl font-bold">Colaboradores</Text>
        </View>
        <View className="w-full max-h-[90%]">
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <FlatList
              data={collaborators}
              className="w-full px-2"
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect({ name: item.name, id: item.id })}
                  className={`w-full h-12 items-center justify-between flex-row px-4 rounded-xl mt-2 bg-primary_400 ${selectedValue === item.id && 'bg-green-800 border border-zinc-100'}`}
                >
                  <Text numberOfLines={1} className="text-zinc-100 font-bold text-xl max-w-[90%]">
                    {item.name}
                  </Text>
                  {selectedValue === item.id && <AntDesign name="check" size={24} color="white" />}
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
