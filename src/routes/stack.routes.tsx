import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from '../app/Account/Login';
import Start from '../app/Account/Start';
import { AppRoutes } from './bottomTab.routes';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          flex: 1,
          backgroundColor: `transparent`,
        },
      }}
    >
      <Screen name="Start" component={Start} />
      <Screen name="Login" component={Login} />
      <Screen name="App" component={AppRoutes} />
    </Navigator>
  );
}
