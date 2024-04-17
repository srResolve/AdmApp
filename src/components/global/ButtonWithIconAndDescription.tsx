import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { ReactNode } from 'react';

interface Props extends TouchableOpacityProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  orientation?: 'left' | 'right';
  titleClassName?: string;
  subtitleClassName?: string;
}

export function ButtonWithIconAndDescription({
  title,
  subtitle,
  icon,
  className,
  titleClassName,
  subtitleClassName,
  orientation = 'left',
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      className={`p-2 bg-green-700 rounded-lg mt-2 ${orientation === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center ${className}`}
      {...rest}
    >
      {icon}
      <View>
        <Text className={`mx-1 text-zinc-100 ${titleClassName} font-bold`}>{title}</Text>
        <Text className={`mx-1 text-zinc-100 ${subtitleClassName}`}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
