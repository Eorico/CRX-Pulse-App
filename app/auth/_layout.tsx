import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="login.screen"
         
      />
      <Tabs.Screen
        name="register.screen"
         
      />
      <Tabs.Screen
        name="forget-password.screen"
         
      />
    </Tabs>
  );
}
