import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { formatNumber } from '../../utils/formatNumbers';
import { BackButton } from './BackButton';
import { IconBaseInput } from './input/IconBaseInput';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  contacts: Contacts.Contact[];
  handleSelect: (contact: { name: string; phoneNumber: string }) => void;
}

export function ContactListModal({ open, setOpen, contacts, handleSelect }: Props) {
  const [contactList, setContactList] = useState<{ name: string; phoneNumber: string }[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleUpdate();
  }, [contacts, search]);

  function handleUpdate() {
    if (contacts.length > 0) {
      const formattedContacts = contacts.map((contact: Contacts.Contact) => {
        if (
          contact.phoneNumbers &&
          contact.phoneNumbers.length > 0 &&
          contact.name &&
          contact.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return {
            name: contact.name,
            phoneNumber: formatNumber(contact.phoneNumbers[0].number as string),
          };
        }
      });

      setContactList(
        formattedContacts.filter(
          (item): item is { name: string; phoneNumber: string } => item !== undefined
        )
      );
    }
  }

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="absolute left-0 right-0 z-10 h-content pb-2 mx-6 rounded-xl items-center h-2/3  bg-primary_600 top-32 px-2">
        <View className="flex-row items-center justify-between w-full pr-2">
          <View className="flex-row">
            <BackButton onPress={() => setOpen(false)} />
            <Text className="text-zinc-100 self-center text-2xl font-bold">Contatos</Text>
          </View>
        </View>
        <IconBaseInput
          error={[]}
          placeholder="Pesquisar"
          name="Pesquisar"
          onChangeText={(text) => setSearch(text)}
          value={search}
          containerStyle="w-full pr-2"
          icon={<AntDesign name="search1" size={24} color="white" />}
        />
        {contacts.length > 0 && (
          <FlatList
            data={contactList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="flex-row justify-between p-2 bg-primary_400 w-full mt-2 rounded-lg items-center"
              >
                <FontAwesome name="user-o" size={24} color="white" />
                <Text numberOfLines={1} className="text-zinc-100 w-6/12 font-semibold text-base">
                  {item.name}
                </Text>
                <Text numberOfLines={1} className="text-zinc-200 text-sm w-4/12">
                  {item.phoneNumber}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View className="flex 1 bg-zinc-900 h-full opacity-90" />
    </Modal>
  );
}
