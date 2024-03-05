import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import { useRef, useState } from 'react';
import { Alert, FlatList, Image, Modal, ScrollView, Text, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { ZodError } from 'zod';
import { Client, Task } from '../../../@types/types';
import { AuthPostAPI } from '../../../lib/axios';
import { ZodCreateBudgetValidation, zodErrorHandler } from '../../../lib/zod';
import { createPdf } from '../../../utils/htmlPdf';
import { AnimatedButton } from '../../global/AnimatedButton';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import * as Button from '../../global/Button';
import { ButtonWithIcon } from '../../global/ButtonWithIcon';
import { ClientModal } from '../../global/ClientModal/ClientModal';
import { DatePickerModal } from '../../global/DatePickerModal';
import PhotoPick from '../../global/SelectPhoto';
import { CreateTaskAndProductModal } from './CreateTaskAndProductModal';
import { ObservationModal } from './ObservationModal';
interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export function CreateBudgetModal({ setOpen, open }: Props) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [photoOpen, setPhotoOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [extraInfoOpen, setExtraInfoOpen] = useState(false);
  const [expireDateModal, setExpireDateModal] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [observationModal, setObservationModal] = useState(false);
  const [executionDateModal, setExecutionDateModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);

  const [observation, setObservation] = useState('');
  const [services, setServices] = useState<Task[]>([]);
  const [products, setProducts] = useState<Task[]>([]);
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [executionDate, setExecutionDate] = useState<Date | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [images, setImages] = useState<{ key: string; location: string }[]>([]);

  async function createBudget() {
    try {
      const createData = {
        client_id: selectedClient?.id,
        due_date: expireDate,
        execution_period: moment(executionDate).diff(moment(), 'days'),
        observation: observation,
        photo: images,
        tasks: services,
        products: products,
      };

      setLoading(true);
      const validation = ZodCreateBudgetValidation.parse(createData);
      setLoading(false);
      const connect = await AuthPostAPI('/budget', validation);
      if (connect.status !== 200) {
        setErrorMessage(connect.body);
        return;
      }

      Alert.alert('Sucesso', 'Orçamento criado com sucesso!', [
        {
          text: 'Gerar PDF',
          onPress: async () => {
            const file = await printToFileAsync({
              html: createPdf(connect.body.budget),
              base64: false,
              height: 842,
              width: 595,
            });
            await shareAsync(file.uri);
          },
        },
        {
          text: 'Fechar',
          onPress: () => {
            setOpen(false);
          },
        },
      ]);
    } catch (error) {
      setLoading(false);
      if (error instanceof ZodError) {
        setErrorMessage(zodErrorHandler(error));
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className=" absolute left-0 right-0 z-10 max-h-screen">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="my-14 mx-5 bg-primary_600  rounded-3xl"
        >
          <View className="flex-row items-center w-full">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Criar Orçamento</Text>
          </View>
          <View className="items-center mb-5 px-4">
            <ButtonWithIcon
              className="w-full justify-between bg-primary_800 py-4 rounded-2xl"
              titleClassName="text-xl"
              title={selectedClient ? selectedClient.name : 'Selecionar cliente'}
              orientation="right"
              onPress={() => setClientModal(true)}
              icon={
                <MaterialCommunityIcons
                  name="arrow-down-drop-circle-outline"
                  size={24}
                  color="white"
                />
              }
            />
            <AnimatedButton open={orderOpen} title="Pedido" setOpen={setOrderOpen} />
            {orderOpen && (
              <>
                <Button.Root variant="selector_secondary" onPress={() => setCreateTaskModal(true)}>
                  <View className="flex-row items-center gap-2">
                    <Entypo name="clipboard" size={24} color="white" />
                    <Button.Title title="Serviços" className="text-zinc-100 text-xl" />
                  </View>
                  {services.length === 0 ? (
                    <AntDesign name="pluscircleo" size={24} color="white" />
                  ) : (
                    <View className="flex-row items-center ">
                      <Text className="text-sm text-zinc-300 font-bold">
                        {services
                          .map((t) => t.value * t.quantity)
                          .reduce((a, b) => a + b)
                          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </Text>
                      <MaterialIcons name="chevron-right" size={30} color="green" />
                    </View>
                  )}
                </Button.Root>
                <Button.Root
                  variant="selector_secondary"
                  onPress={() => setCreateProductModal(true)}
                >
                  <View className="flex-row items-center gap-2">
                    <Feather name="shopping-cart" size={24} color="white" />
                    <Button.Title title="Produtos" className="text-zinc-100 text-xl" />
                  </View>
                  {products.length === 0 ? (
                    <AntDesign name="pluscircleo" size={24} color="white" />
                  ) : (
                    <View className="flex-row items-center ">
                      <Text className="text-sm text-zinc-300 font-bold">
                        {services
                          .map((t) => t.value * t.quantity)
                          .reduce((a, b) => a + b)
                          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </Text>
                      <MaterialIcons name="chevron-right" size={30} color="green" />
                    </View>
                  )}
                </Button.Root>
              </>
            )}
            <AnimatedButton
              open={extraInfoOpen}
              title="Informações extras"
              setOpen={setExtraInfoOpen}
            />
            {extraInfoOpen && (
              <>
                <Button.Root variant="selector_secondary" onPress={() => setExpireDateModal(true)}>
                  <View className="flex-row items-center gap-2">
                    <AntDesign name="clockcircle" size={24} color="white" />
                    <Button.Title title="Validade do Orçamento" className="text-zinc-100 text-lg" />
                  </View>
                  {expireDate === null ? (
                    <AntDesign name="pluscircleo" size={24} color="white" />
                  ) : (
                    <AntDesign name="checkcircleo" size={24} color="green" />
                  )}
                </Button.Root>
                <Button.Root
                  variant="selector_secondary"
                  onPress={() => setExecutionDateModal(true)}
                >
                  <View className="flex-row items-center gap-2">
                    <AntDesign name="calendar" size={24} color="white" />
                    <Button.Title title="Prazo de execução" className="text-zinc-100 text-lg" />
                  </View>
                  {executionDate === null ? (
                    <AntDesign name="pluscircleo" size={24} color="white" />
                  ) : (
                    <AntDesign name="checkcircleo" size={24} color="green" />
                  )}
                </Button.Root>
                <Button.Root variant="selector_secondary" onPress={() => setObservationModal(true)}>
                  <View className="flex-row items-center gap-2">
                    <Feather name="alert-circle" size={24} color="white" />
                    <Button.Title title="Observações" className="text-zinc-100 text-lg" />
                  </View>
                  {observation === '' ? (
                    <AntDesign name="pluscircleo" size={24} color="white" />
                  ) : (
                    <AntDesign name="checkcircleo" size={24} color="green" />
                  )}
                </Button.Root>
              </>
            )}
            <AnimatedButton open={photoOpen} title="Fotos" setOpen={setPhotoOpen} />
            {photoOpen && (
              <View>
                <View className="w-full">
                  <FlatList
                    data={images}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    className=""
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item.location }}
                        className="w-32 h-32 ml-2 rounded-2xl border-zinc-100 border-2"
                      />
                    )}
                  />
                </View>
                <PhotoPick
                  ref={actionSheetRef}
                  onImagemChange={(data) => setImages((old) => [...old, data])}
                />
                <Button.Root variant="selector" onPress={() => actionSheetRef.current?.show()}>
                  <View className="flex-row gap-2 items-center justify-center">
                    <FontAwesome name="photo" size={24} color="white" />
                    <Button.Title title="Nova Foto" />
                  </View>
                  <AntDesign name="pluscircleo" size={24} color="white" />
                </Button.Root>
              </View>
            )}
            <View className="items-center flex-1 justify-end  ">
              <Text className="text-red-600 text-center font-semibold text-md">{errorMessage}</Text>
              <BaseButton
                loading={loading}
                onPress={createBudget}
                title="Criar orçamento"
                variant="confirmation"
                className="w-auto px-4"
              />
              <BaseButton title="Voltar" variant="base" className="w-auto px-4" />
            </View>
          </View>

          <CreateTaskAndProductModal
            open={createTaskModal}
            setOpen={setCreateTaskModal}
            title="Serviço"
            pluralTitle="Serviços"
            data={services}
            handleEdit={(data, index) =>
              setServices((prev) => [...prev.filter((_, i) => i !== index), data])
            }
            handleDelete={(index) => setServices((prev) => [...prev.filter((_, i) => i !== index)])}
            handleChange={(data) => setServices((prev) => [...prev, data])}
          />
          <CreateTaskAndProductModal
            open={createProductModal}
            setOpen={setCreateProductModal}
            title="Produto"
            pluralTitle="Produtos"
            data={products}
            handleEdit={(data, index) =>
              setProducts((prev) => [...prev.filter((_, i) => i !== index), data])
            }
            handleDelete={(index) => setProducts((prev) => [...prev.filter((_, i) => i !== index)])}
            handleChange={(data) => setProducts((prev) => [...prev, data])}
          />
          <ObservationModal
            open={observationModal}
            setOpen={setObservationModal}
            observation={observation}
            setObservation={setObservation}
          />
          <DatePickerModal
            open={executionDateModal}
            setOpen={setExecutionDateModal}
            date={executionDate}
            setDate={setExecutionDate}
            title="Prazo de execução"
            placeholder="Prazo de execução"
          />
          <DatePickerModal
            open={expireDateModal}
            setOpen={setExpireDateModal}
            date={expireDate}
            setDate={setExpireDate}
            title="Validade"
            placeholder="Validade do orçamento"
          />

          <ClientModal
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            open={clientModal}
            setOpen={setClientModal}
          />
        </ScrollView>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
