import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CollaboratorsPayment } from '../../components/app/finance/CollaboratorsPayment';
import { FinanceAccount } from '../../components/app/finance/FinanceAccounts';
import { FinanceSchedule } from '../../components/app/finance/FinanceSchedule';
import { FinancialRegister } from '../../components/app/finance/FinancialRegister';
import { TodayFinanceSchedule } from '../../components/app/finance/TodayFinanceSchedule';
import { GlobalTitle } from '../../components/global/GlobalTitle';

export default function Finance() {
  const [currentTable, setCurrentTable] = useState('daySchedule');

  return (
    <View className="flex-1 items-center bg-primary_800">
      <GlobalTitle text=" Aqui você pode conferir toda a parte financeira, basta escolher no card abaixo qual informação deseja ver." />
      <View className="w-full mt-5 px-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row w-full">
          <TouchableOpacity
            className={`ml-5 rounded-lg px-6 py-4 flex-row  items-center justify-center ${currentTable === 'daySchedule' ? 'bg-primary_800 border-2 border-zinc-100' : 'bg-primary_400'}`}
            onPress={() => setCurrentTable('daySchedule')}
          >
            <AntDesign name="calendar" size={24} color="white" />
            <Text className="text-lg font-semibold text-zinc-100 ml-1">Agenda do dia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-5 rounded-lg px-6 py-4 flex-row  items-center justify-center ${currentTable === 'accounts' ? 'bg-primary_800 border-2 border-zinc-100' : 'bg-primary_400'}`}
            onPress={() => setCurrentTable('accounts')}
          >
            <FontAwesome name="bank" size={24} color="white" />
            <Text className="text-lg font-semibold text-zinc-100 ml-1">Contas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-5 rounded-lg px-6 py-4 flex-row  items-center justify-center ${currentTable === 'collaboratorsPayment' ? 'bg-primary_800 border-2 border-zinc-100' : 'bg-primary_400'}`}
            onPress={() => setCurrentTable('collaboratorsPayment')}
          >
            <MaterialCommunityIcons name="account-cog-outline" size={20} color="white" />
            <Text className="text-lg font-semibold text-zinc-100 ml-1">Colaboradores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-5 rounded-lg px-6 py-4 flex-row  items-center justify-center ${currentTable === 'schedule' ? 'bg-primary_800 border-2 border-zinc-100' : 'bg-primary_400'}`}
            onPress={() => setCurrentTable('schedule')}
          >
            <AntDesign name="calendar" size={24} color="white" />
            <Text className="text-lg font-semibold text-zinc-100 ml-1">Agendadas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-5 rounded-lg px-6 py-4 flex-row  items-center justify-center ${currentTable === 'financialRegister' ? 'bg-primary_800 border-2 border-zinc-100' : 'bg-primary_400'}`}
            onPress={() => setCurrentTable('financialRegister')}
          >
            <FontAwesome5 name="funnel-dollar" size={24} color="white" />
            <Text className="text-lg font-semibold text-zinc-100 ml-1">Entradas e saídas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {currentTable === 'daySchedule' ? (
        <TodayFinanceSchedule />
      ) : currentTable === 'schedule' ? (
        <FinanceSchedule />
      ) : currentTable === 'collaboratorsPayment' ? (
        <CollaboratorsPayment />
      ) : currentTable === 'accounts' ? (
        <FinanceAccount />
      ) : (
        <FinancialRegister />
      )}
    </View>
  );
}
