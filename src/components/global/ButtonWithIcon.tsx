import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { ReactNode } from 'react';

interface Props extends TouchableOpacityProps {
  title: string;
  icon: ReactNode;
  orientation?: 'left' | 'right';
  titleClassName?: string;
}

export function ButtonWithIcon({
  title,
  icon,
  className,
  titleClassName,
  orientation = 'left',
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      className={`p-2 bg-green-700 rounded-lg mt-2 ${orientation === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center ${className}`}
      {...rest}
    >
      {icon}
      <Text numberOfLines={1} className={`mx-1 text-white font-bold ${titleClassName} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
