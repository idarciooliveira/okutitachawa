import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'ComicSansBold',
        },
        headerTitleAlign: 'center'
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Okutitachawa',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
        <Tabs.Screen
        name="notification"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color }) => <TabBarIcon  name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Minha Conta',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
