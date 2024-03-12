import { Image, View } from "react-native";
import { ButtonWithIcon } from "./ButtonWithIcon";

interface Props {
    selected: 'INCOME' | 'OUTCOME' | '' ,
    setSelected: (value: 'INCOME' | 'OUTCOME') => void;
}

export function FinanceTypeSelector ({ selected, setSelected }: Props) {
    return(
        <View className="flex-row w-full justify-between my-4">
        <ButtonWithIcon
          title="Entrada"
          onPress={() => setSelected('INCOME')}
          className={selected === 'INCOME' ? 'bg-green-700 w-[52%]  border border-zinc-100' : 'bg-green-700 opacity-70'}
          titleClassName={selected === 'INCOME' ? 'text-2xl ml-2' : 'text-xl ml-2'}
          icon={<Image source={require('../../../assets/inputIcon.png')} />}
        />
        <ButtonWithIcon
          title="Saída"
          onPress={() => setSelected('OUTCOME')}
          className={selected === 'OUTCOME' ? 'bg-red-700 w-[52%] border border-zinc-100' : 'bg-red-700 opacity-70'}
          titleClassName={selected === 'OUTCOME' ? 'text-2xl ml-2' : 'text-xl ml-2'}
          icon={<Image source={require('../../../assets/outputIcon.png')} />}
        />
      </View>
    )
}