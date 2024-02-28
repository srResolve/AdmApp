import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  title: string;
}

export function Title({ title, className, ...rest }: Props) {
  return (
    <Text className={`text-zinc-50 text-2xl font-bold ${className}`} {...rest}>
      {title}
    </Text>
  );
}
