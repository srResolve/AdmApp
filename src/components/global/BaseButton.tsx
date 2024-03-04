import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const variants = {
  base: 'bg-primary_600 w-3/4 h-14 rounded-3xl items-center justify-center mt-5 ',
  confirmation: 'bg-green-700 w-3/4 h-14 rounded-2xl items-center justify-center mt-5 ',
  selector: 'bg-primary_800 w-full h-14 rounded-xl items-center justify-between flex-row mt-5 px-2',
  minimal_size: 'bg-primary_800 w-content px-8 h-14 rounded-xl items-center justify-center mt-5',
  selector_secondary:
    'bg-primary_700 w-full h-14 rounded-xl items-center justify-between flex-row mt-2 px-2',
};

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'confirmation' | 'base' | 'selector' | 'selector_secondary' | 'minimal_size';
  titleClassName?: string;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

export function BaseButton({
  variant = 'base',
  titleClassName,
  title,
  disabled,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`${variants[variant]} ${rest.className} ${disabled ? 'opacity-50' : ''}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text className={`text-zinc-50 text-2xl font-bold ${titleClassName}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
