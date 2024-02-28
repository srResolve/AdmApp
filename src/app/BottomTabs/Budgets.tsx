import { Text, View } from 'react-native';
import { CreateBudgetModal } from '../../components/app/budget/CreateBudgetModal';

export default function Budgets() {
  return (
    <View className="flex-1 items-center justify-center bg-primary_800">
      <Text>Budgets</Text>
      <CreateBudgetModal />
    </View>
  );
}
