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
import { AuthPostAPI, authGetAPI } from '../../../lib/axios';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { ButtonWithIcon } from '../../global/ButtonWithIcon';
import { IconButton } from '../../global/IconButton';
import { BaseInput } from '../../global/input/BaseInput';

interface Props {
  handleSelect: (value: string) => void;
  selectedValue: string;
}

export function FinanceCategorySelector({ handleSelect, selectedValue }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ name: string; id: string }[]>([]);
  const [createCategory, setCreateCategory] = useState(false);
  const [name, setName] = useState('');
  const [createCategoryLoading, setCreateCategoryLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    const connect = await authGetAPI('/finance/category');
    setLoading(false);
    if (connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao buscar as categorias');
    }
    setCategories(connect.body.categories);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCreateCategory() {
    setCreateCategoryLoading(true);
    const connect = await AuthPostAPI('/finance/category', { name });
    setCreateCategoryLoading(false);
    if (connect.status !== 201 && connect.status !== 200) {
      return Alert.alert('Erro', 'Ocorreu um erro ao criar a categoria');
    }

    setCreateCategory(false);
    fetchCategories();
  }

  return (
    <View className="w-full">
      <ButtonWithIcon
        title={
          selectedValue
            ? categories.find((item) => item.id === selectedValue)?.name ||
              'Selecione uma categoria'
            : 'Selecione uma categoria'
        }
        className="justify-between bg-primary_400 border border-zinc-100 my-2 h-14"
        orientation="right"
        titleClassName="text-xl"
        icon={<Entypo name="chevron-down" size={28} color="white" />}
        onPress={() => setModalOpen(true)}
      />

      <Modal visible={modalOpen} transparent>
        <View className="absolute left-0 right-0 z-10  pb-2 mx-6 rounded-xl items-center  bg-primary_600 top-24 h-[70%]">
          <View className="w-full flex-row justify-between px-2 items-center">
            <BackButton onPress={() => setModalOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Categorias</Text>
            <IconButton
              onPress={() => setCreateCategory(!createCategory)}
              className="bg-green-700"
              icon={<AntDesign name="pluscircleo" size={32} color="white" />}
            />
          </View>
          {createCategory ? (
            <View className="w-full items-center">
              <BaseInput
                error={[]}
                name="name"
                placeholder="categoria"
                onChangeText={setName}
                value={name}
              />
              <BaseButton
                title="Criar"
                variant="confirmation"
                loading={createCategoryLoading}
                onPress={handleCreateCategory}
              />
            </View>
          ) : (
            <View className="w-full max-h-[90%]">
              {loading ? (
                <ActivityIndicator size="large" color="white" />
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
                      <Text className="text-zinc-100 font-bold text-xl">{item.name}</Text>
                      {selectedValue === item.id && (
                        <AntDesign name="check" size={24} color="white" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>
        <View className="flex 1 bg-zinc-900 h-full opacity-90" />
      </Modal>
    </View>
  );
}
