import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const variants = {
  base: 'bg-primary_600 w-3/4 h-14 rounded-3xl items-center justify-center mt-5 ',
  confirmation: 'bg-green-700 w-3/4 h-14 rounded-2xl items-center justify-center mt-5 ',
  selector: 'bg-primary_800 w-full h-14 rounded-xl items-center justify-between flex-row mt-5 px-2',
  selector_secondary:
    'bg-primary_700 w-full h-14 rounded-xl items-center justify-between flex-row mt-2 px-2',
};

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'confirmation' | 'base' | 'selector' | 'selector_secondary';
}

export function Root({ variant = 'base', children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity className={`${variants[variant]} ${rest.className}`} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
