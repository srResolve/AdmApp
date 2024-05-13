import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
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

export function BankAccountSelector({ handleSelect, selectedValue }: Props) {
  const [modal, setModal] = useState(false);
  const [accounts, setAccounts] = useState<{ name: string; id: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleGetAccounts() {
      setLoading(true);
      const connect = await authGetAPI('/bank-account');
      setLoading(false);
      if (connect.status !== 200) {
        return Alert.alert('Erro', 'Ocorreu um erro ao buscar as contas');
      }
      setAccounts(connect.body.accounts);
    }
    handleGetAccounts();
  }, []);

  return (
    <View>
      <DoubleIconButton
        onPress={() => setModal(true)}
        leftIcon={<MaterialIcons name="folder-copy" size={28} color="#5b5859" />}
        rightIcon={<Entypo name="chevron-down" size={28} color="#5b5859" />}
        className="bg-lightBlue border border-zinc-50"
        title={accounts.find((item) => item.id === selectedValue)?.name || 'Selecione uma conta'}
        titleClassName="text-xl"
      />

      <Modal visible={modal} transparent>
        <View className="absolute left-0 right-0 z-10  pb-2 mx-6 rounded-xl items-center  bg-primary_600 top-24 h-[70%]">
          <View className="w-full flex-row  px-2 items-center">
            <BackButton onPress={() => setModal(false)} />
            <Text className="text-black self-center text-2xl font-bold">Contas</Text>
          </View>

          <View className="w-full max-h-[90%]">
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <FlatList
                className="w-full px-2"
                data={accounts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.id)}
                    className={`w-full h-12 items-center justify-between flex-row px-4 rounded-xl mt-2 bg-primary_400 ${selectedValue === item.id && 'bg-green-800 border border-zinc-100'}`}
                  >
                    <Text className="text-black font-bold text-xl">{item.name}</Text>
                    {selectedValue === item.id && (
                      <AntDesign name="check" size={24} color="white" />
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
