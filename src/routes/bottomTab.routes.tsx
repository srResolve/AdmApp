import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text } from 'react-native';
import Budgets from '../app/BottomTabs/Budgets';
import Finance from '../app/BottomTabs/Finance';
import { Home } from '../app/BottomTabs/Home';
import Profile from '../app/BottomTabs/Profile';
import Schedule from '../app/BottomTabs/Schedule';
const { Navigator, Screen } = createBottomTabNavigator();
export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 15,
          paddingBottom: 15,
          height: 80,
          marginHorizontal: 10,
          width: '100%',
          marginLeft: 0,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <FontAwesome
                name="home"
                size={focused ? 36 : 32}
                color={focused ? 'black' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-black' : 'text-zinc-400'} text-sm font-bold`}>
                Inicio
              </Text>
            </>
          ),
        }}
      />
      <Screen
        name="Budgets"
        component={Budgets}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <FontAwesome5
                name="file-contract"
                size={focused ? 36 : 32}
                color={focused ? 'black' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-black' : 'text-zinc-400'} text-sm font-bold`}>
                Orçamento
              </Text>
            </>
          ),
        }}
      />
      <Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <FontAwesome
                name="calendar"
                size={focused ? 36 : 32}
                color={focused ? 'black' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-black' : 'text-zinc-400'} text-sm font-bold`}>
                Agenda
              </Text>
            </>
          ),
        }}
      />
      {/* <Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialCommunityIcons
                name="finance"
                size={focused ? 36 : 32}
                color={focused ? 'black' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-black' : 'text-zinc-400'} text-sm font-bold`}>
                Financeiro
              </Text>
            </>
          ),
        }}
      /> */}
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <FontAwesome
                name="user"
                size={focused ? 36 : 32}
                color={focused ? 'black' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-black' : 'text-zinc-400'} text-sm font-bold`}>
                Perfil
              </Text>
            </>
          ),
        }}
      />
    </Navigator>
  );
}
