import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
interface Props {
  options: {
    label: string;
    value: string;
  }[];
  handleSelect: (value: string) => void;
  selectedValue: string;
}

export function Selector({ options, handleSelect, selectedValue }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const pickerRef = useRef<any>();

  const handleOpen = () => {
    pickerRef.current.focus();
  };

  return (
    <>
      <RNPickerSelect
        style={{
          inputIOS: {
            fontSize: 18,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            height: 47,
            marginTop: 15,
            borderColor: 'white',
            borderRadius: 10,
            color: 'white',
            paddingRight: 50,
            backgroundColor: '#7D8FE8',
          },
          inputAndroid: {
            fontSize: 18,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            height: 47,
            marginTop: 15,
            borderColor: 'white',
            borderRadius: 10,
            color: 'white',
            paddingRight: 50,
            backgroundColor: '#7D8FE8',
          },
          iconContainer: {
            marginTop: 26,
          },
        }}
        Icon={() => <Entypo name="chevron-down" size={24} color="white" />}
        useNativeAndroidPickerStyle={false}
        value={selectedValue}
        placeholder={{ label: 'Filtros', value: null }}
        onValueChange={(value) => handleSelect(value)}
        items={options}
      />
    </>
    // <Select
    //   selectedValue={selectedValue}
    //   accessibilityLabel="Filtros"
    //   placeholder="Filtros"
    //   _selectedItem={{
    //     bg: '#7D8FE8',
    //   }}
    //   width={40}
    //   dropdownIcon={<Entypo name="chevron-down" size={24} color="white" />}
    //   backgroundColor={'#7D8FE8'}
    //   color={'white'}
    //   fontSize={14}
    //   onValueChange={handleSelect}
    // >
    //   {options.map((option) => (
    //     <Select.Item
    //       key={option.label}
    //       label={option.label}
    //       value={option.value}
    //       style={{ alignItems: 'center' }}
    //     />
    //   ))}
    // </Select>
  );
}
