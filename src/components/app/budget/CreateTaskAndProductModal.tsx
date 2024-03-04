import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Modal, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { Task } from '../../../@types/types';
import { ZodCreateTaskAndProduct } from '../../../lib/zod';
import { AnimatedButton } from '../../global/AnimatedButton';
import { BackButton } from '../../global/BackButton';
import { BaseButton } from '../../global/BaseButton';
import { InputForm } from '../../global/input/FormInput';
import { EditTaskAndProductModal } from './EditTaskAndProductModal';
import { TaskAndProductCard } from './TaskAndProductCard';
interface Props {
  open: boolean;
  title: string;
  pluralTitle: string;
  data: Task[];
  setOpen: (open: boolean) => void;
  handleChange: (data: any) => void;
  handleDelete: (index: number) => void;
  handleEdit: (data: Task, index: number) => void;
}

export function CreateTaskAndProductModal({
  title,
  pluralTitle,
  data,
  open,
  setOpen,
  handleChange,
  handleEdit,
  handleDelete,
}: Props) {
  const [editModal, setEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [createTaskOpen, setCreateTaskOpen] = useState(true);
  const [serviceListOpen, setServiceListOpen] = useState(true);

  const { control, handleSubmit, reset } = useForm();

  function createTaskAndProduct(data: any) {
    try {
      setErrorMessage('');
      setFormErrors([]);
      const dataValidation = ZodCreateTaskAndProduct.parse(data);
      handleChange(dataValidation);
      setServiceListOpen(true);
      // return reset();
    } catch (error) {
      if (error instanceof ZodError) {
        setFormErrors(error.issues.map((issue) => issue.path[0].toString()));
        setErrorMessage('Verifique os campos em vermelho');
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <>
        <View className="absolute top-0 left-0 right-0 z-10 max-h-[] h-5/6 pb-2  my-14 mx-6 rounded-xl items-center  bg-primary_600">
          <View className="flex-row items-center w-full">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">{pluralTitle}</Text>
          </View>
          <View className="items-center flex-1 w-full px-4">
            <AnimatedButton
              open={createTaskOpen}
              title={`Criar ${title}`}
              setOpen={setCreateTaskOpen}
            />
            {createTaskOpen && (
              <>
                <InputForm
                  error={formErrors}
                  control={control}
                  name="name"
                  containerStyle="w-full  self-center"
                  placeholder={`Qual é o ${title}`}
                />
                <View className="flex-row w-full justify-between ">
                  <InputForm
                    error={formErrors}
                    control={control}
                    name="quantity"
                    keyboardType="number-pad"
                    containerStyle="w-6/12 "
                    placeholder="Quantidade"
                  />
                  <InputForm
                    error={formErrors}
                    control={control}
                    name="value"
                    keyboardType="number-pad"
                    containerStyle="w-5/12 "
                    placeholder="Quantidade"
                  />
                </View>
                <Text className="text-red-700 text-lg text-center self-center mt-5 font-bold">
                  {errorMessage}
                </Text>
                <BaseButton
                  title={`Criar ${title}`}
                  variant="confirmation"
                  onPress={handleSubmit(createTaskAndProduct)}
                />
              </>
            )}
            <AnimatedButton
              open={serviceListOpen}
              title={`${pluralTitle} Criados`}
              setOpen={setServiceListOpen}
            />
            {serviceListOpen && data.length > 0 && (
              <View className="flex-1">
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => JSON.stringify(item)}
                  renderItem={({ item, index }) => (
                    <>
                      <TaskAndProductCard
                        handleDelete={() => handleDelete(index)}
                        item={item}
                        handleEdit={() => setEditModal(true)}
                      />
                      <EditTaskAndProductModal
                        data={item}
                        title={title}
                        open={editModal}
                        setOpen={setEditModal}
                        handleEdit={(data: Task) => {
                          setEditModal(false);
                          handleEdit(data, index);
                        }}
                      />
                    </>
                  )}
                />
              </View>
            )}
          </View>
        </View>
        <View className="flex 1 bg-zinc-900 h-full opacity-90" />
      </>
    </Modal>
  );
}
