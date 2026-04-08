import { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle, Menu } from 'lucide-react-native';
import { CircularProgress } from '@/components/circular.tracker';
import { DrawerMenu } from '@/components/drawer.menu';

export default function ManagementScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [waterQualityMonitoring, setWaterQualityMonitoring] = useState(true);
  const [automatedFeeding, setAutomatedFeeding] = useState(true);

  const readings = [
    { time: '10:30 AM', temp: '24°C' },
    { time: '9:45 AM', temp: '23°C' },
    { time: '9:00 AM', temp: '23°C' },
  ];

  return (
    <View className="flex-1 bg-[#F5F5DC]">
      <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <View className="bg-[#3D5A3D] pt-16 pb-6 px-6 rounded-b-3xl flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">Garden Monitor</Text>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Menu color="#FFFFFF" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <Text className="text-[#3D5A3D] text-base font-bold mb-4">System Controls</Text>

          <View className="flex-row justify-between items-center py-2">
            <View className="flex-1">
              <Text className="text-[#333] text-sm font-semibold mb-1">Water Quality Monitoring</Text>
              <Text className="text-[#999] text-xs">Automatic quality checks</Text>
            </View>
            <Switch
              value={waterQualityMonitoring}
              onValueChange={setWaterQualityMonitoring}
              trackColor={{ false: '#E0E0E0', true: '#7AA87A' }}
              thumbColor={waterQualityMonitoring ? '#3D5A3D' : '#f4f3f4'}
            />
          </View>

          <View className="h-px bg-[#E0E0E0] my-4" />

          <View className="flex-row justify-between items-center py-2">
            <View className="flex-1">
              <Text className="text-[#333] text-sm font-semibold mb-1">Automated Feeding</Text>
              <Text className="text-[#999] text-xs">Schedule-based feeding</Text>
            </View>
            <Switch
              value={automatedFeeding}
              onValueChange={setAutomatedFeeding}
              trackColor={{ false: '#E0E0E0', true: '#7AA87A' }}
              thumbColor={automatedFeeding ? '#3D5A3D' : '#f4f3f4'}
            />
          </View>
        </View>

        <Text className="text-[#3D5A3D] text-xl font-bold mb-1">Water Quality</Text>
        <Text className="text-[#666] text-sm mb-4">Monitor water parameters</Text>

        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <View className="flex-row justify-around items-center">
            <CircularProgress value={24} maxValue={30} label="Temp" color="#3D5A3D" />
            <CircularProgress value={0.25} maxValue={1} label="NH₃" color="#8B6F47" />
            <CircularProgress value={4.2} maxValue={10} label="NTU" color="#3D5A3D" />
          </View>
        </View>

        <View className="bg-[#FFF9E6] rounded-xl p-4 mb-4 border border-[#E6D5A8]">
          <View className="flex-row items-center mb-1">
            <AlertCircle color="#8B6F47" size={20} />
            <Text className="text-[#8B6F47] text-sm font-bold ml-2">Water Status</Text>
          </View>
          <Text className="text-[#8B6F47] text-xs ml-7">
            All parameters within optimal range
          </Text>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <Text className="text-[#3D5A3D] text-base font-bold mb-4">Recent Readings</Text>
          <View className="space-y-3">
            {readings.map((reading, index) => (
              <View key={index} className="flex-row justify-between items-center">
                <Text className="text-[#333] text-sm">{reading.time}</Text>
                <View className="flex-row items-center space-x-2">
                  <Text className="text-[#3D5A3D] text-sm font-semibold">{reading.temp}</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-[#3D5A3D]" />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}