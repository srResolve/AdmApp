import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { convertStatus } from '../../utils/convertStatus';

const colors = {
  ACTIVE: {
    text: 'text-status_active',
    rgba: 'rgba(76, 175, 80, 0.2)',
  },
  PENDING: {
    text: 'text-status_pending',
    rgba: 'rgba(255, 235, 59, 0.2)',
  },
  APPROVED: {
    text: 'text-status_approved',
    rgba: 'rgba(33, 150, 243, 0.2)',
  },
  REFUSED: {
    text: 'text-status_refused',
    rgba: 'rgba(244, 67, 54, 0.2)',
  },
  COMPLETE: {
    text: 'text-status_complete',
    rgba: 'rgba(63, 81, 181, 0.2)',
  },
  PAYED: {
    text: 'text-status_payed',
    rgba: 'rgba(26, 255, 35, 0.2)',
  },
  EXECUTED: {
    text: 'text-status_executed',
    rgba: 'rgba(255, 152, 0, 0.2)',
  },
  FINISHED: {
    text: 'text-status_finished',
    rgba: 'rgba(158, 158, 158, 0.2)',
  },
  STARTED: {
    text: 'text-status_started',
    rgba: 'rgba(0, 188, 212, 0.2)',
  },
  UNFINISHED: {
    text: 'text-status_unfinished',
    rgba: 'rgba(158, 158, 158, 0.2)',
  },
};
interface Props {
  status:
    | 'ACTIVE'
    | 'PENDING'
    | 'APPROVED'
    | 'REFUSED'
    | 'COMPLETE'
    | 'PAYED'
    | 'EXECUTED'
    | 'FINISHED'
    | 'STARTED'
    | 'UNFINISHED';
}

export function StatusCard({ status }: Props) {
  const formattedStatus = convertStatus(status);

  return (
    <View className="rounded-lg overflow-hidden">
      <LinearGradient colors={[colors[status].rgba, colors[status].rgba]}>
        <Text className={`py-1 px-4 ${colors[status].text} text-sm font-bold`}>
          {formattedStatus}
        </Text>
      </LinearGradient>
    </View>
  );
}
