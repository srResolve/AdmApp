import { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  icon: ReactNode;
}

export function IconButton({ icon, className, ...rest }: Props) {
  return (
    <TouchableOpacity className={`bg-zinc-100 p-1 rounded-md ${className}`} {...rest}>
      {icon}
    </TouchableOpacity>
  );
}
