import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export function BackButton() {
  return (
    <TouchableOpacity>
      <MaterialIcons name="chevron-left" size={50} color="white" />
    </TouchableOpacity>
  );
}
