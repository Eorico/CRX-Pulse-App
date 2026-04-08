import { Tabs } from 'expo-router';
import { Hop as Home, Settings } from 'lucide-react-native';

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
        name="home.screen"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="management.screen"
        options={{
          title: 'Controls',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}
