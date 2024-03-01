import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { ReactNode } from 'react';

interface Props extends TouchableOpacityProps {
  title: string;
  icon: ReactNode;
  orientation?: 'left' | 'right';
}

export function ButtonWithIcon({ title, icon, className, orientation = 'left', ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`p-2 bg-green-700 rounded-lg mt-2 ${orientation === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center ${className}`}
      {...rest}
    >
      {icon}
      <Text className="mx-1  text-zinc-100 font-bold">{title}</Text>
    </TouchableOpacity>
  );
}
