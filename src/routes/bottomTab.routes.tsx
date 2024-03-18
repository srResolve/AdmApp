import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Budgets from '../app/BottomTabs/Budgets';
import Profile from '../app/BottomTabs/Profile';
const { Navigator, Screen } = createBottomTabNavigator();
export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 0,
          marginBottom: RFValue(25),
          height: RFValue(60),
          paddingTop: 15,
          marginHorizontal: 10,
          borderRadius: 20,
          position: 'absolute',
          shadowColor: 'rgb(47, 64, 85)',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
        },
        tabBarBackground: () =>
          Platform.OS === 'android' ? (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: 'rgba(92, 113, 214, 0.95)',
              }}
            />
          ) : (
            <BlurView
              tint="dark"
              intensity={30}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: 'rgba(92, 113, 214, 0.8)',
              }}
            />
          ),
      }}
    >
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
                color={focused ? 'white' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-white' : 'text-zinc-400'} text-sm font-bold`}>
                Orçamento
              </Text>
            </>
          ),
        }}
      />
      {/* <Screen
        name="Schedule"
        // listeners={{
        //   tabPress: (e) => {
        //     // Prevent default action
        //     e.preventDefault();
        //   },
        // }}
        component={Schedule}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <FontAwesome
                name="calendar"
                size={focused ? 36 : 32}
                color={focused ? 'white' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-white' : 'text-zinc-400'} text-sm font-bold`}>
                Agenda
              </Text>
            </>
          ),
        }}
      />

      <Screen
        name="Finance"
        // listeners={{
        //   tabPress: (e) => {
        //     // Prevent default action
        //     e.preventDefault();
        //   },
        // }}
        component={Finance}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialCommunityIcons
                name="finance"
                size={focused ? 36 : 32}
                color={focused ? 'white' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-white' : 'text-zinc-400'} text-sm font-bold`}>
                Financeiro
              </Text>
            </>
          ),
        }}
      /> */}
      <Screen
        name="Profile"
        component={Profile}
        // listeners={{
        //   tabPress: (e) => {
        //     // Prevent default action
        //     e.preventDefault();
        //   },
        // }}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <>
              <FontAwesome
                name="user"
                size={focused ? 36 : 32}
                color={focused ? 'white' : '#a1a1aa'}
              />
              <Text className={`${focused ? 'text-white' : 'text-zinc-400'} text-sm font-bold`}>
                Perfil
              </Text>
            </>
          ),
        }}
      />
    </Navigator>
  );
}
