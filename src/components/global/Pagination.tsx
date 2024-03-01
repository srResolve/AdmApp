import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  const [pages, setPages] = useState<number[]>(Array.from({ length: totalPages }, (_, i) => i + 1));

  useEffect(() => {
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
  }, [totalPages]);

  return (
    <View className="flex-row items-center justify-center">
      <TouchableOpacity
        onPress={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
      >
        <MaterialIcons name="chevron-left" size={50} color="white" />
      </TouchableOpacity>
      <FlatList
        data={pages}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPageChange(item)}
            className={`${item === currentPage ? 'bg-primary_600 px-2' : 'px-1'} ml-px mr-px rounded`}
          >
            <Text className="text-white text-2xl font-semibold">{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => onPageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
      >
        <MaterialIcons name="chevron-right" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}
