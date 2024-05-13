import { AntDesign, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { authGetAPI } from '../../../lib/axios';
import { BackButton } from '../../global/BackButton';
import { DoubleIconButton } from '../../global/DoubleIconButton';

interface Props {
  handleSelect: (value: string) => void;
  selectedValue: string;
}

export function ServiceCategorySelector({ handleSelect, selectedValue }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ name: string; id: string }[]>([]);
  const [createCategory, setCreateCategory] = useState(false);
  const [name, setName] = useState('');
  const [createCategoryLoading, setCreateCategoryLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    const connect = await authGetAPI('/category');
    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao buscar as categorias');
    }
    setCategories(connect.body.category);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View className="w-full">
      <DoubleIconButton
        title={
          selectedValue
            ? categories.find((item) => item.id === selectedValue)?.name ||
              'Selecione uma categoria'
            : 'Selecione uma categoria'
        }
        titleClassName="text-xl"
        rightIcon={
          selectedValue === '' ? (
            <AntDesign name="pluscircleo" size={24} color="black" />
          ) : (
            <AntDesign name="checkcircleo" size={24} color="green" />
          )
        }
        onPress={() => setModalOpen(true)}
        leftIcon={<Entypo name="folder" size={28} color="black" />}
      />

      <Modal visible={modalOpen} transparent>
        <View className="absolute left-0 right-0 z-10  pb-2 mx-6 rounded-xl items-center  bg-white top-24 h-[70%]">
          <View className="w-full flex-row px-2 items-center">
            <BackButton onPress={() => setModalOpen(false)} />
            <Text className="text-black self-center text-2xl font-bold">Categorias</Text>
          </View>
          <View className="w-full max-h-[90%]">
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <FlatList
                className="w-full px-2"
                data={categories}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.id)}
                    className={`w-full h-12 items-center justify-between flex-row px-4 rounded-xl mt-2 bg-primary_400 ${selectedValue === item.id && 'bg-green-800 border border-zinc-100'}`}
                  >
                    <Text className={` ${selectedValue === item.id ? "text-white":"text-primary_800"} font-bold text-xl`}>{item.name}</Text>
                    {selectedValue === item.id && (
                      <AntDesign name="check" size={24} color="black" />
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
        <View className="flex 1 bg-zinc-900 h-full opacity-90" />
      </Modal>
    </View>
  );
}
