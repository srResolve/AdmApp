import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function BackButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <MaterialIcons name="chevron-left" size={50} color="lightgray" />
    </TouchableOpacity>
  );
}
