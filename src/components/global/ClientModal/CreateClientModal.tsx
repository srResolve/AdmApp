import { AntDesign } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Modal, Text, View } from 'react-native';
import { ZodError } from 'zod';
import { AuthPostAPI } from '../../../lib/axios';
import { ZodCreateClientValidation } from '../../../lib/zod';
import { BackButton } from '../BackButton';
import { BaseButton } from '../BaseButton';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { ContactListModal } from '../ContactListModal';
import { InputForm } from '../input/FormInput';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateClientModal({ open, setOpen }: Props) {
  const [formError, setFormError] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [contactListModal, setContactListModal] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  async function getContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar contatos foi negada');
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      setContactListModal(true);
      setContacts(data);
    }
  }

  async function handleCreateClient(data: any) {
    try {
      setErrorMessage('');
      setFormError([]);
      const dataValidation = ZodCreateClientValidation.parse(data);

      setLoading(true);
      const connect = await AuthPostAPI('/client', dataValidation);
      setLoading(false);
      console.log(connect);
      if (connect.status !== 201 && connect.status !== 200) {
        return setErrorMessage(connect.body);
      }

      Alert.alert('Sucesso', 'Cliente criado com sucesso!');

      setOpen(false);
    } catch (error) {
      if (error instanceof ZodError) {
        setFormError(error.issues.map((issue) => issue.path[0].toString()));
      }
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      {open && (
        <>
          <View className="absolute left-0 right-0 z-10 h-content pb-2 mx-6 rounded-xl items-center  bg-white top-32">
            <View className="flex-row items-center justify-between w-full pr-2">
              <View className="flex-row">
                <BackButton onPress={() => setOpen(false)} />
                <Text className="text-black self-center text-2xl font-bold">Criar cliente</Text>
              </View>
              <ButtonWithIcon
                title="Contatos"
                className="bg-primary_600"
                onPress={getContacts}
                icon={<AntDesign name="contacts" size={24} color="white" />}
              />
            </View>
            <View className="px-4 w-full items-center">
              <InputForm
                control={control}
                error={formError}
                name="name"
                placeholder="Nome do cliente"
                containerStyle="w-full"
              />
              <InputForm
                control={control}
                error={formError}
                name="cpfCnpj"
                placeholder="CPF ou CNPJ"
                containerStyle="w-full"
              />
              <InputForm
                control={control}
                error={formError}
                name="mobile_phone"
                placeholder="Telefone do Cliente"
                keyboardType="phone-pad"
                containerStyle="w-full"
              />
              <InputForm
                control={control}
                error={formError}
                name="address"
                placeholder="Endereço do cliente"
                containerStyle="w-full"
              />
              <InputForm
                control={control}
                error={formError}
                name="location"
                placeholder="Localização do cliente"
                containerStyle="w-full"
              />

              <Text className="text-red-500">{errorMessage}</Text>
              <BaseButton
                title="Criar cliente"
                variant="confirmation"
                loading={loading}
                onPress={handleSubmit(handleCreateClient)}
              />
            </View>
          </View>
          <ContactListModal
            handleSelect={({ name, phoneNumber }) => {
              reset({ name, mobile_phone: phoneNumber });
              setContactListModal(false);
            }}
            open={contactListModal}
            setOpen={setContactListModal}
            contacts={contacts}
          />
          <View className="flex 1 bg-zinc-900 h-full opacity-90" />
        </>
      )}
    </Modal>
  );
}
