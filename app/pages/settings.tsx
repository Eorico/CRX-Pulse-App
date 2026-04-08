import { useState } from 'react';
import { View, Text, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, LogOut as LogOutIcon } from 'lucide-react-native';
import { DrawerMenu } from '@/components/drawer.menu';
import { useAuth } from '@/contexts/auth.context';

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('Garden Owner');
  const [email, setEmail] = useState('owner@garden.com');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoWatering, setAutoWatering] = useState(true);

  const handleLogout = () => {
    signOut();
    router.replace('/auth/login.screen');
  };

  return (
    <View className="flex-1 bg-[#F5F5DC]">
      <View className="bg-[#3D5A3D] pt-16 pb-6 px-6 rounded-b-3xl flex-row justify-between items-center">
        <View>
          <Text className="text-white text-2xl font-bold">Garden Monitor</Text>
          <Text className="text-[#E8E8D0] text-sm mt-1">Welcome back!</Text>
        </View>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Menu color="#FFFFFF" size={28} />
        </TouchableOpacity>
      </View>

      <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <Text className="text-[#3D5A3D] text-xl font-bold mb-1">Settings</Text>
        <Text className="text-[#666] text-sm mb-5">Manage your preferences</Text>

        {/* Profile Card */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <View className="flex-row items-center mb-4">
            <Text className="text-[#3D5A3D] text-base font-bold">Profile</Text>
          </View>

          <View className="mb-4">
            <Text className="text-[#3D5A3D] text-xs font-semibold mb-1.5">Name</Text>
            <TextInput
              className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-md px-3 py-2 text-sm text-[#333]"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>

          <View className="mb-4">
            <Text className="text-[#3D5A3D] text-xs font-semibold mb-1.5">Email</Text>
            <TextInput
              className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-md px-3 py-2 text-sm text-[#333]"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Notifications Card */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <Text className="text-[#3D5A3D] text-base font-bold mb-4">Notifications</Text>

          <View className="flex-row justify-between items-center py-4">
            <View>
              <Text className="text-[#333] text-sm font-semibold mb-1">Push Notifications</Text>
              <Text className="text-[#999] text-xs">Get alerts for important events</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#E0E0E0', true: '#7AA87A' }}
              thumbColor={pushNotifications ? '#3D5A3D' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* System Card */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <Text className="text-[#3D5A3D] text-base font-bold mb-4">System</Text>

          <View className="flex-row justify-between items-center py-4">
            <View className="flex-1">
              <Text className="text-[#333] text-sm font-semibold mb-1">Auto Watering</Text>
              <Text className="text-[#999] text-xs">Enable automatic watering</Text>
            </View>
            <Switch
              value={autoWatering}
              onValueChange={setAutoWatering}
              trackColor={{ false: '#E0E0E0', true: '#7AA87A' }}
              thumbColor={autoWatering ? '#3D5A3D' : '#f4f3f4'}
            />
          </View>

          <View className="h-px bg-[#E0E0E0] my-2" />

          <View className="flex-row justify-between items-center py-4">
            <View className="flex-1">
              <Text className="text-[#333] text-sm font-semibold mb-1">Feeding Reminders</Text>
              <Text className="text-[#999] text-xs">15 min before scheduled time</Text>
            </View>
            <Text className="text-[#3D5A3D] text-xs font-semibold">15 min</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-[#E63946] flex-row justify-center items-center py-3 rounded-md mt-6 space-x-2"
          onPress={handleLogout}
        >
          <LogOutIcon color="#FFFFFF" size={20} />
          <Text className="text-white text-base font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}