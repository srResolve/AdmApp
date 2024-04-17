import { Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { ButtonWithIcon } from '../../components/global/ButtonWithIcon';
import { ButtonWithIconAndDescription } from '../../components/global/ButtonWithIconAndDescription';
export function Home() {
  return (
    <View className="flex-1 items-center  bg-primary_800">
      <Image source={require('../../../assets/logoYellow.png')} className="h-20 w-[53%]  mt-10" />
      <View className="w-full ml-10 mt-6">
        <Text className="text-zinc-100 text-2xl font-bold mt-4">Bem Vindo</Text>
      </View>
      <ButtonWithIconAndDescription
        title="Criar novo orçamento"
        subtitle="Crie novos orçamentos para seus clientes"
        titleClassName="text-lg ml-4"
        subtitleClassName="ml-4"
        className="w-11/12 mt-5 bg-primary_700 py-4"
        icon={<FontAwesome5 name="file-contract" size={32} color="white" />}
      />
      <ButtonWithIconAndDescription
        title="Novo Serviço"
        subtitle="Crie uma nova ordem de serviço"
        subtitleClassName="ml-4"
        titleClassName="text-lg ml-4"
        className="w-11/12 bg-primary_600 mt-4 py-4"
        icon={<FontAwesome6 name="toolbox" size={32} color="white" />}
      />
      <View className="w-full ml-10 mt-4">
        <Text className="text-zinc-100 text-xl font-bold mt-4">Atalhos</Text>
      </View>
      <View className="w-full flex-row justify-around mt-4">
        <ButtonWithIcon
          title="Nova Entrada"
          titleClassName="text-lg mt-2 text-center text-zinc-800 "
          className="w-40 mt-5 bg-zinc-200 flex-col items-start"
          icon={<FontAwesome6 name="sack-dollar" size={38} color="#084f09" />}
        />
        <ButtonWithIcon
          title="Clientes"
          titleClassName="text-lg mt-2 text-center text-zinc-800 "
          className="w-40 mt-5 bg-zinc-200 flex-col items-start"
          icon={<Feather name="user" size={38} color="black" />}
        />
      </View>
    </View>
  );
}
