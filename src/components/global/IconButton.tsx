import { ReactNode } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  icon: ReactNode;
  loading?: boolean;
}

export function IconButton({ icon, className, loading = false, ...rest }: Props) {
  return (
    <TouchableOpacity className={`bg-zinc-100 p-1 rounded-md ${className}`} {...rest}>
      {loading ? <ActivityIndicator size="small" color="white" /> : icon}
    </TouchableOpacity>
  );
}
