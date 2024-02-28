import { useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

export default function Start() {
  const [loading, setLoading] = useState(true);
  return (
    <View className="flex-1 flex items-center justify-center bg-primary_800">
      <Image source={require('../../../assets/logo.png')} className="w-52 h-52" />
      <Text className="text-zinc-50 text-2xl p-5 text-center">
        Tem coisas que só o Senhor Resolve!
      </Text>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}
