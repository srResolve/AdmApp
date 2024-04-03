import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Modal, ScrollView, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { Budget } from '../../../@types/types';
import { AuthPutAPI } from '../../../lib/axios';
import { ZodUpdateBudgetValidation, zodErrorHandler } from '../../../lib/zod';
import { totalPriceCalc } from '../../../utils/totalPriceCalculator';
import { AnimatedButton } from '../../global/AnimatedButton';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { DatePickerModal } from '../../global/DatePickerModal';
import { DoubleIconButton } from '../../global/DoubleIconButton';
import { CreateTaskAndProductModal } from '../../global/TaskAndProductModal/CreateTaskAndProductModal';
import { ObservationModal } from './ObservationModal';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget: Budget;
  handleUpdate: () => void;
}

export function UpdateBudgetModal({ open, setOpen, budget, handleUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderOpen, setOrderOpen] = useState(true);
  const [extraInfoOpen, setExtraInfoOpen] = useState(true);
  const [expireDateModal, setExpireDateModal] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [observationModal, setObservationModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);

  const [newBudget, setNewBudget] = useState<Budget>({
    ...budget,
    tasks: budget.tasks,
    observation: budget.observation ? budget.observation : undefined,
    product: budget.product ? budget.product : [],
  });

  async function handleUpdateBudget() {
    try {
      setErrorMessage('');
      const updateData = {
        ...newBudget,
        observation: newBudget.observation ? newBudget.observation : undefined,
        tasks: newBudget.tasks.filter((item) => item.action),
        products: newBudget.product.filter((item) => item.action),
      };

      const validation = ZodUpdateBudgetValidation.parse(updateData);
      setLoading(true);
      const connect = await AuthPutAPI(`/budget/${budget.id}`, validation);
      setLoading(false);

      if (connect.status !== 200) {
        return Alert.alert('Erro', 'Ocorreu um erro ao atualizar o orçamento');
      }

      Alert.alert('Orçamento atualizado com sucesso');

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
      <View className=" absolute left-0 right-0 z-10 max-h-screen">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="my-14 mx-5 bg-primary_600  rounded-3xl"
        >
          <View className="flex-row items-center w-full">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Editar Orçamento</Text>
          </View>
          <View className="items-center mb-5 px-4">
            <AnimatedButton open={orderOpen} title="Pedido" setOpen={setOrderOpen} />
            {orderOpen && (
              <>
                <DoubleIconButton
                  title="Serviços"
                  leftIcon={<Entypo name="clipboard" size={24} color="white" />}
                  onPress={() => setCreateTaskModal(true)}
                  rightIcon={
                    newBudget.tasks.length === 0 ? (
                      <AntDesign name="pluscircleo" size={24} color="white" />
                    ) : (
                      <View className="flex-row items-center ">
                        <Text className="text-sm text-zinc-300 font-bold">
                          {totalPriceCalc(newBudget.tasks)}
                        </Text>
                        <MaterialIcons name="chevron-right" size={30} color="green" />
                      </View>
                    )
                  }
                />
                <DoubleIconButton
                  title="Materiais"
                  onPress={() => setCreateProductModal(true)}
                  leftIcon={<Feather name="shopping-cart" size={24} color="white" />}
                  rightIcon={
                    newBudget.product.length === 0 ? (
                      <AntDesign name="pluscircleo" size={24} color="white" />
                    ) : (
                      <View className="flex-row items-center ">
                        <Text className="text-sm text-zinc-300 font-bold">
                          {totalPriceCalc(newBudget.product)}
                        </Text>
                        <MaterialIcons name="chevron-right" size={30} color="green" />
                      </View>
                    )
                  }
                />
              </>
            )}
            <AnimatedButton
              open={extraInfoOpen}
              title="Informações extras"
              setOpen={setExtraInfoOpen}
            />
            {extraInfoOpen && (
              <>
                <DoubleIconButton
                  leftIcon={<AntDesign name="clockcircle" size={24} color="white" />}
                  title="Validade do Orçamento"
                  onPress={() => setExpireDateModal(true)}
                  rightIcon={
                    newBudget.due_date === null ? (
                      <AntDesign name="pluscircleo" size={24} color="white" />
                    ) : (
                      <AntDesign name="checkcircleo" size={24} color="green" />
                    )
                  }
                />
                <DoubleIconButton
                  leftIcon={<Feather name="alert-circle" size={24} color="white" />}
                  title="Observações"
                  onPress={() => setObservationModal(true)}
                  rightIcon={
                    newBudget.observation === '' ? (
                      <AntDesign name="pluscircleo" size={24} color="white" />
                    ) : (
                      <AntDesign name="checkcircleo" size={24} color="green" />
                    )
                  }
                />
              </>
            )}

            <Text className="text-red-600 text-center font-semibold text-md">{errorMessage}</Text>
            <BaseButton
              loading={loading}
              onPress={handleUpdateBudget}
              title="Atualizar Orçamento"
              variant="confirmation"
              className="w-full px-4"
            />
            <BaseButton
              title="Voltar"
              variant="base"
              className="w-auto px-4"
              onPress={() => setOpen(false)}
            />
          </View>
          <CreateTaskAndProductModal
            open={createTaskModal}
            setOpen={setCreateTaskModal}
            title="Serviço"
            pluralTitle="Serviços"
            data={newBudget.tasks}
            handleEdit={(data, index) =>
              setNewBudget({
                ...newBudget,
                tasks: [
                  ...newBudget.tasks.filter((_, i) => i !== index),
                  newBudget.tasks[index].action === 'CREATE'
                    ? { ...data, action: 'CREATE' }
                    : { ...data, action: 'UPDATE', id: newBudget.tasks[index].id },
                ],
              })
            }
            handleDelete={(index) => {
              setNewBudget({
                ...newBudget,
                tasks: [
                  ...newBudget.tasks.filter((_, i) => i !== index),
                  { ...newBudget.tasks[index], action: 'DELETE' },
                ],
              });
            }}
            handleChange={(data) => {
              setNewBudget({
                ...newBudget,
                tasks: [...newBudget.tasks, { ...data, action: 'CREATE' }],
              });
            }}
          />
          <CreateTaskAndProductModal
            open={createProductModal}
            setOpen={setCreateProductModal}
            title="Produto"
            pluralTitle="Produtos"
            data={newBudget.product}
            handleEdit={(data, index) =>
              setNewBudget({
                ...newBudget,
                product: [
                  ...newBudget.product.filter((_, i) => i !== index),
                  { ...data, action: 'UPDATE', id: newBudget.product[index].id },
                ],
              })
            }
            handleDelete={(index) => {
              setNewBudget({
                ...newBudget,
                product: [
                  ...newBudget.product.filter((_, i) => i !== index),
                  { ...newBudget.product[index], action: 'DELETE' },
                ],
              });
            }}
            handleChange={(data) => {
              setNewBudget({
                ...newBudget,
                product: [...newBudget.product, { ...data, action: 'CREATE' }],
              });
            }}
          />

          <ObservationModal
            open={observationModal}
            setOpen={setObservationModal}
            observation={newBudget.observation}
            setObservation={(observation) =>
              setNewBudget({ ...newBudget, observation: observation })
            }
          />
          <DatePickerModal
            open={expireDateModal}
            setOpen={setExpireDateModal}
            date={newBudget.due_date}
            setDate={(date) => setNewBudget({ ...newBudget, due_date: date })}
            title="Validade"
            placeholder="Validade do orçamento"
          />
        </ScrollView>
      </View>
      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
