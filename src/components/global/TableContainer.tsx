import { AntDesign } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import { ButtonWithIcon } from './ButtonWithIcon';
import { Pagination } from './Pagination';
import { Selector } from './Selector';
import { IconBaseInput } from './input/IconBaseInput';

interface Props extends ViewProps {
  children: React.ReactNode;
  title: string;
  pages: number;
  loading: boolean;
  icon: React.ReactNode;
  addButtonTitle: string;
  selectorOptions?: {
    label: string;
    value: string;
  }[];
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
  filter?: boolean;
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
  loading,
  filterOptions,
  setFilterOptions,
  addButtonTitle,
  addButtonPress,
  className,
  selectorOptions = [
    {
      label: 'Todos',
      value: 'all',
    },
    {
      label: 'Status',
      value: 'status',
    },
  ],
  filter = true,
  ...rest
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className={`w-full h-4/6 mt-5 rounded-lg border-2 border-zinc-100 bg-primary_800 overflow-hidden ${className}`}
        {...rest}
      >
        <View className="border-b-2 border-zinc-100 w-full px-2 bg-primary_800 ">
          <View className="w-full justify-between flex-row items-center py-2 ">
            <View className="flex-row items-center">
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
          {filter && (
            <View className="py-2 flex-row justify-between items-center">
              {filterOptions.type === 'status' || filterOptions.type === 'type' ? (
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
                options={selectorOptions}
                handleSelect={(item: string) => setFilterOptions({ ...filterOptions, type: item })}
                selectedValue={filterOptions.type}
              />
            </View>
          )}
        </View>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          children
        )}
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
