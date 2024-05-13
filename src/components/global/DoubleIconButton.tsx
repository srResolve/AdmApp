import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { ReactNode } from 'react';

interface Props extends TouchableOpacityProps {
  title: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  titleClassName?: string;
}

export function DoubleIconButton({
  title,
  className,
  titleClassName,
  leftIcon,
  rightIcon,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      className={`p-2 bg-[#bfdbfe] w-full justify-between rounded-xl mt-2 py-4 flex-row items-center ${className}`}
      {...rest}
    >
      <View className={`flex-row items-center`}>
        {leftIcon}
        <Text className={`ml-2 text-lg text-black ${titleClassName} font-bold`}>{title}</Text>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
}
