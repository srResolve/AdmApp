import { Entypo } from '@expo/vector-icons';
import { Select } from 'native-base';
interface Props {
  options: {
    label: string;
    value: string;
  }[];
  handleSelect: (value: string) => void;
  selectedValue: string;
}

export function Selector({ options, handleSelect, selectedValue }: Props) {
  return (
    <Select
      selectedValue={selectedValue}
      accessibilityLabel="Filtros"
      placeholder="Filtros"
      _selectedItem={{
        bg: '#7D8FE8',
      }}
      width={40}
      dropdownIcon={<Entypo name="chevron-down" size={24} color="white" />}
      backgroundColor={'#7D8FE8'}
      color={'white'}
      fontSize={14}
      height={47}
      borderRadius={10}
      mt={4}
      onValueChange={handleSelect}
    >
      {options.map((option) => (
        <Select.Item
          key={option.label}
          label={option.label}
          value={option.value}
          style={{ alignItems: 'center' }}
        />
      ))}
    </Select>
  );
}
