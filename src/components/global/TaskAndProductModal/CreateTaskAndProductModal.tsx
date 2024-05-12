import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Modal, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { Task } from '../../../@types/types';
import { ZodCreateTaskAndProduct } from '../../../lib/zod';
import { totalPriceCalc } from '../../../utils/totalPriceCalculator';
import { AnimatedButton } from '../AnimatedButton';
import { BackButton } from '../BackButton';
import { BaseButton } from '../BaseButton';
import { InputForm } from '../input/FormInput';
import { EditTaskAndProductModal } from './EditTaskAndProductModal';
import { TaskAndProductCard } from './TaskAndProductCard';
interface Props {
  open: boolean;
  title: string;
  pluralTitle: string;
  data: Task[];
  hasPrice?: boolean;
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
  hasPrice = true,
}: Props) {
  const listRef = useRef<any>();
  const [editModal, setEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [createTaskOpen, setCreateTaskOpen] = useState(true);
  const [serviceListOpen, setServiceListOpen] = useState(true);

  const { control, handleSubmit, reset } = useForm({});

  function createTaskAndProduct(data: any) {
    try {
      const finalData = {
        ...data,
        value: hasPrice ? data.value : 1,
        quantity: data.quantity ? data.quantity : 1,
      };
      setErrorMessage('');
      setFormErrors([]);
      const dataValidation = ZodCreateTaskAndProduct.parse(finalData);
      handleChange(dataValidation);
      setServiceListOpen(true);

      listRef.current.scrollToOffset({ animated: true, offset: 0 });

      return reset();
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
                    placeholder={`${title} aqui`}
                  />
                  <View className="flex-row w-full justify-between">
                    <InputForm
                      error={formErrors}
                      control={control}
                      name="quantity"
                      keyboardType="number-pad"
                      containerStyle="w-6/12 "
                      placeholder="Quantidade"
                    />
                    {hasPrice && (
                      <InputForm
                        error={formErrors}
                        control={control}
                        name="value"
                        keyboardType="number-pad"
                        containerStyle="w-5/12 "
                        placeholder="Quantidade"
                      />
                    )}
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
                title={`${pluralTitle} Criados(as)`}
                setOpen={setServiceListOpen}
              />

              {serviceListOpen && data.length > 0 && (
                <View className="flex-1">
                  <FlatList
                    ref={listRef}
                    data={data}
                    inverted
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => JSON.stringify(item)}
                    renderItem={({ item, index }) => (
                      <>
                        <TaskAndProductCard
                          hasPrice={hasPrice}
                          handleDelete={() => handleDelete(index)}
                          item={item}
                          handleEdit={() => setEditModal(true)}
                        />
                        <EditTaskAndProductModal
                          data={item}
                          hasPrice={hasPrice}
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
              {hasPrice && (
                <>
                  <View className="flex-row gap-2 items-center mt-2">
                    <Text className="text-zinc-100 font-semibold">Valor Total: </Text>
                    <Text className="text-green-300 font-bold text-lg">
                      {data.length > 0 && totalPriceCalc(data)}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </>
        <View className="flex 1 bg-zinc-900 h-full opacity-90" />
      </>
    </Modal>
  );
}
