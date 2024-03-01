import { AntDesign } from '@expo/vector-icons';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ButtonWithIcon } from './ButtonWithIcon';
import { Pagination } from './Pagination';
import { Selector } from './Selector';
import { IconBaseInput } from './input/IconBaseInput';

interface Props {
  children: React.ReactNode;
  title: string;
  pages: number;
  icon: React.ReactNode;
  addButtonTitle: string;
  addButtonPress: () => void;
  statusOptions: {
    label: string;
    value: string;
  }[];
  filterOptions: {
    page: number;
    query: string;
    status: string;
    limit: number;
    type: string;
  };
  setFilterOptions: (options: {
    page: number;
    query: string;
    status: string;
    type: string;
    limit: number;
  }) => void;
  setCurrentPage: (page: number) => void;
}

export const TableContainer = ({
  children,
  title,
  pages,
  setCurrentPage,
  icon,
  statusOptions,
  filterOptions,
  setFilterOptions,
  addButtonTitle,
  addButtonPress,
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="w-full h-4/6 mt-5 rounded-lg border-2 border-zinc-100 bg-primary_800 overflow-hidden">
        <View className="border-b-2 border-zinc-100 w-full px-2 bg-primary_800 ">
          <View className="w-full justify-between flex-row items-center py-2 ">
            <View className="flex-row">
              {icon}
              <Text className="text-zinc-100 ml-2 font-bold text-xl">{title}</Text>
            </View>
            <ButtonWithIcon
              className="m-0"
              title={addButtonTitle}
              onPress={addButtonPress}
              icon={<AntDesign name="pluscircleo" size={18} color="white" />}
            />
          </View>
          <View className="py-2 flex-row justify-between items-center">
            {filterOptions.type === 'status' ? (
              <Selector
                options={statusOptions}
                handleSelect={(item: string) =>
                  setFilterOptions({ ...filterOptions, status: item })
                }
                selectedValue={filterOptions.status}
              />
            ) : (
              <IconBaseInput
                error={[]}
                name="search"
                keyboardType={filterOptions.type === 'name' ? 'default' : 'numeric'}
                value={filterOptions.query}
                onChangeText={(value) => setFilterOptions({ ...filterOptions, query: value })}
                placeholder="Pesquisar..."
                containerStyle="pr-2 w-6/12 h-12 border-zinc-100"
                icon={<AntDesign name="search1" size={24} color="white" />}
              />
            )}
            <Selector
              options={[
                { label: 'Nome', value: 'name' },
                { label: 'Código', value: 'code' },
                { label: 'Valor', value: 'value' },
                { label: 'Status', value: 'status' },
              ]}
              handleSelect={(item: string) => setFilterOptions({ ...filterOptions, type: item })}
              selectedValue={filterOptions.type}
            />
          </View>
        </View>
        {children}
        <View className="border-t-2 mt-2 border-zinc-100 px-2 w-full justify-center items-center">
          <Pagination
            totalPages={pages}
            currentPage={filterOptions.page}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
