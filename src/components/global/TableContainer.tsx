import { AntDesign } from '@expo/vector-icons';
import { Keyboard, Text, TouchableWithoutFeedback, View, ViewProps } from 'react-native';
import { ButtonWithIcon } from './ButtonWithIcon';
import { Selector } from './Selector';
import { IconBaseInput } from './input/IconBaseInput';

interface Props extends ViewProps {
  children: React.ReactNode;
  title: string;
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
}

export const TableContainer = ({
  children,
  title,
  icon,
  statusOptions,
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
      <View className={`flex-1 rounded-lg bg-primary_800 overflow-hidden ${className}`} {...rest}>
        <View className={`w-full px-2 bg-primary_800  `}>
          <View className="w-full justify-between flex-row items-center py-2 ">
            <View className="flex-row items-center">
              {icon}
              <Text className="text-black ml-2 font-bold text-2xl">{title}</Text>
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
                  keyboardType={filterOptions.type === 'code' ? 'numeric' : 'default'}
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
        <View className="flex-1">{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};
