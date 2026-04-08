import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Menu } from 'lucide-react-native';
import { CircularProgress } from '@/components/circular.tracker';
import { DrawerMenu } from '@/components/drawer.menu';

export default function HomeScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activityItems = [
    { text: 'Water level checked', time: '10:30 AM', color: '#3D5A3D' },
    { text: 'Feeding completed', time: '8:00 AM', color: '#8B6F47' },
    { text: 'System check', time: '7:00 AM', color: '#3D5A3D' },
  ];

  return (
    <View className="flex-1 bg-[#F5F5DC]">
      <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <View className="bg-[#3D5A3D] pt-16 pb-6 px-6 rounded-b-3xl flex-row justify-between items-center">
        <View>
          <Text className="text-white text-2xl font-bold">Garden Monitor</Text>
          <Text className="text-[#E8E8D0] text-sm mt-1">Welcome back!</Text>
        </View>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Menu color="#FFFFFF" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
      >
        <Text className="text-[#3D5A3D] text-xl font-bold mb-4">
          Dashboard Overview
        </Text>

        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <Text className="text-[#3D5A3D] text-base font-bold mb-4">Water Quality</Text>
          <View className="flex-row justify-around items-center">
            <CircularProgress value={24} maxValue={30} label="Temp" color="#3D5A3D" />
            <CircularProgress value={0.25} maxValue={1} label="NH₃" color="#8B6F47" />
            <CircularProgress value={4.2} maxValue={10} label="NTU" color="#3D5A3D" />
          </View>
        </View>

        <View className="bg-[#3D5A3D] rounded-2xl p-5 mb-4">
          <Text className="text-[#E8E8D0] text-sm mb-2">Next Feeding</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-4xl font-bold">2:30 PM</Text>
            <Text className="text-[#E8E8D0] text-2xl font-semibold">75g</Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <Text className="text-[#3D5A3D] text-base font-bold mb-4">Recent Activity</Text>
          <View className="space-y-4">
            {activityItems.map((item, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                <View className="flex-row justify-between flex-1 items-center">
                  <Text className="text-[#333] text-sm font-medium">{item.text}</Text>
                  <Text className="text-[#999] text-xs">{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}