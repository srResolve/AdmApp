import { StackActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { loginVerifyAPI } from '../../lib/axios';

export default function Start() {
  const navigation = useNavigation<any>();

  async function loginVerify() {
    const verify = await loginVerifyAPI();
    if (verify == 200) {
      return navigation.dispatch(StackActions.replace('App'));
    }
    return navigation.dispatch(StackActions.replace('Login'));
  }

  useEffect(() => {
    loginVerify();
  }, []);

  return (
    <View className="flex-1 flex items-center justify-center bg-primary_800">
      <Image source={require('../../../assets/logo.png')} className="w-52 h-52" />
      <Text className="text-zinc-50 text-2xl p-5 text-center">
        Tem coisas que só o Senhor Resolve!
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
