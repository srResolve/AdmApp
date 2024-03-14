import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StatusCard } from '../../global/StatusCard';
import { ServiceDetailsModal } from './ServiceDetailsModal';

export function ScheduleTableCard({ item }: any) {
  const [detailsModal, setDetailsModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setDetailsModal(true)}
      className="flex-row justify-between p-1 px-2 items-center bg-primary_400 mt-2 rounded-lg border border-zinc-100"
    >
      <View className=" w-4/6">
        <View className="flex-row items-center">
          <AntDesign name="user" size={16} color="white" />
          <Text className="ml-1 text-lg font-semibold text-zinc-100">{item.client.name}</Text>
        </View>
        <View className="flex-row items-center w-full">
          <MaterialCommunityIcons name="account-cog-outline" size={14} color="white" />
          <Text
            numberOfLines={1}
            className=" ml-1 font-semibold text-base text-zinc-100 flex-1 truncate"
          >
            {(item.user && item.user.name) || '-'}
          </Text>
        </View>
        <View className="flex-row items-center">
          <AntDesign name="clockcircleo" size={16} color="white" />
          <Text className="ml-1 text-sm font-semibold text-zinc-300">
            {moment(item.date).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
      <ServiceDetailsModal
        open={detailsModal}
        setOpen={setDetailsModal}
        service={item}
        handleUpdate={() => {}}
      />
      <View>
        <StatusCard status={item.status} />
      </View>
    </TouchableOpacity>
  );
}
