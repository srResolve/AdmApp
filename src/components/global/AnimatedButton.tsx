import { AntDesign } from '@expo/vector-icons';
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager } from 'react-native';

interface Props {
  open: boolean;
  title: string;
  setOpen: (open: boolean) => void;
}

export function AnimatedButton({ open, title, setOpen }: Props) {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
      }}
      className="w-full justify-between m-4 flex-row  items-center"
    >
      <Text className="text-zinc-100 text-2xl font-bold self-start">{title}</Text>
      <AntDesign
        name="downcircle"
        size={24}
        color="white"
        style={{ transform: open ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }] }}
      />
    </TouchableOpacity>
  );
}
