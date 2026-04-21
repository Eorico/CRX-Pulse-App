import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { DrawerMenu } from '@/components/drawer.menu';
import { CircularProgress } from '@/components/circular.tracker';
import {
  Menu,
  Thermometer,
  Droplet,
  FlaskConical,
  Waves,
  RefreshCw,
} from 'lucide-react-native';

/* ================= ICON SYSTEM ================= */
const Icon = ({ type }: { type: string }) => {
  const size = 18;
  const color = '#FFFFFF';

  switch (type) {
    case 'temp':
      return <Thermometer size={size} color={color} />;
    case 'ph':
      return <FlaskConical size={size} color={color} />;
    case 'ammonia':
      return <Droplet size={size} color={color} />;
    case 'turbidity':
      return <Waves size={size} color={color} />;
    case 'refresh':
      return <RefreshCw size={size} color={color} />;
    default:
      return <View className="w-4 h-4 bg-gray-300 rounded-full" />;
  }
};

const StatusBadge = ({ label }: { label: string }) => {
  const getBg = () => {
    switch (label) {
      case 'SAFE':
      case 'NORMAL':
      case 'CLEAR':
      case 'NEUTRAL':
        return '#85C79A';
      case 'WARNING':
        return '#F6FF99';
      case 'DANGER':
        return '#FF6B6B';
      default:
        return '#D1D5DB';
    }
  };

  const getTextColor = () => {
    return label === 'DANGER' ? 'text-white' : 'text-[#0F172A]';
  };

  return (
    <View
      style={{ backgroundColor: getBg() }}
      className="px-2 py-0.5 rounded-full items-center"
    >
      <Text className={`text-[9px] font-bold text-center ${getTextColor()}`}>
        {label}
      </Text>
    </View>
  );
};

export default function ManagementScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [waterQualityMonitoring, setWaterQualityMonitoring] = useState(true);
  const [automatedFeeding, setAutomatedFeeding] = useState(false);
  const [manualFlush, setManualFlush] = useState(false);

  /* ================= LOG DATA ================= */
  const logs = [
    {
      time: '2:00 PM',
      date: 'JUNE 24, 2024',
      temp: '24.2°C',
      tempStatus: 'NORMAL',
      ph: '7.4',
      phStatus: 'NEUTRAL',
      ammonia: '0.02 ppm',
      ammoniaStatus: 'SAFE',
      turbidity: '1.2 NTU',
      turbidityStatus: 'CLEAR',
    },
    {
      time: '12:00 NN',
      date: 'JUNE 24, 2023',
      temp: '24.1°C',
      tempStatus: 'NORMAL',
      ph: '7.3',
      phStatus: 'NEUTRAL',
      ammonia: '0.01 ppm',
      ammoniaStatus: 'SAFE',
      turbidity: '1.1 NTU',
      turbidityStatus: 'CLEAR',
    },
    {
      time: '10:00 AM',
      date: 'JUNE 24, 2023',
      temp: '23.9°C',
      tempStatus: 'NORMAL',
      ph: '7.2',
      phStatus: 'NEUTRAL',
      ammonia: '0.03 ppm',
      ammoniaStatus: 'SAFE',
      turbidity: '1.3 NTU',
      turbidityStatus: 'CLEAR',
    },
  ];

  /* ================= METRICS ================= */
  const metrics = [
    { type: 'temp', value: '24.2°C', desc: 'Temperature', status: 'NORMAL' },
    { type: 'ph', value: '7.4 pH', desc: 'Acidity', status: 'NEUTRAL' },
    { type: 'ammonia', value: '0.02 ppm', desc: 'Ammonia', status: 'SAFE' },
    { type: 'turbidity', value: '1.2 NTU', desc: 'Turbidity', status: 'CLEAR' },
  ];

  return (
    <View className="flex-1 bg-[#F1F5F9]">

      {/* DRAWER */}
      <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* HEADER */}
      <View className="bg-[#01377D] pt-16 pb-5 px-5 flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">CRX-Pulse</Text>

        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Menu color="#fff" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* HERO */}
        <View className="bg-[#117554] rounded-2xl p-6 mb-5">
          <View className="bg-green-600 px-3 py-1 rounded-full self-start mb-3 self-center">
            <Text className="text-[11px] text-white font-bold text-center">
              SYSTEM VITALITY: EXCELLENT
            </Text>
          </View>

          <Text className="text-white text-3xl font-bold mb-2 text-center">
            All Parameters Optimal
          </Text>

          <Text className="text-green-100 text-sm text-center">
            Biosphere conditions are synchronized and stable.
          </Text>
        </View>

        {/* CONTROLS */}
        <View className="space-y-3 mb-6">

          <View className="bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm mb-3">
            <View>
              <Text className="font-semibold text-[#0F172A]">
                Water Quality Monitoring
              </Text>
              <Text className="text-xs text-gray-500">
                Auto-checks water parameters
              </Text>
            </View>
            <Switch value={waterQualityMonitoring} onValueChange={setWaterQualityMonitoring} />
          </View>

          <View className="bg-white rounded-xl p-4 flex-row justify-between items-center shadow-sm mb-3">
            <View>
              <Text className="font-semibold text-[#0F172A]">
                Automatic Feeding
              </Text>
              <Text className="text-xs text-gray-500">
                Schedule-based feeding
              </Text>
            </View>
            <Switch value={automatedFeeding} onValueChange={setAutomatedFeeding} />
          </View>

          <TouchableOpacity
            onPress={() => setManualFlush(true)}
            className="bg-[#FECACA] rounded-xl p-4 flex-row justify-between items-center mb-3"
          >
            <View>
              <Text className="font-semibold text-[#7F1D1D]">
                Emergency Flush
              </Text>
              <Text className="text-xs text-[#7F1D1D]">
                Manually filters water
              </Text>
            </View>
            <Icon type="refresh" />
          </TouchableOpacity>
        </View>

        {manualFlush && (
          <View className="bg-white rounded-xl p-4 mb-3 border border-blue-200 shadow-sm">
            
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-bold text-[#0F172A]">
                Filtration Status
              </Text>

              <View className="px-2 py-1 rounded-full bg-blue-100">
                <Text className="text-[10px] font-bold text-blue-700">
                  ACTIVE FLUSH
                </Text>
              </View>
            </View>

            <Text className="text-xs text-gray-500">
              Manual filtration is currently running. Water is being purified in real-time.
            </Text>

            <TouchableOpacity
              onPress={() => setManualFlush(false)}
              className="mt-3 bg-blue-600 py-2 rounded-lg items-center"
            >
              <Text className="text-white text-xs font-bold">
                STOP FLUSH
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {/* METRICS HEADER */}
        <View className="flex-row justify-between items-end mb-3">
          <Text className="text-xl font-bold text-[#0F172A]">
            Environmental Metrics
          </Text>
          <Text className="text-xs text-gray-500">
            Last updated: 2 mins ago
          </Text>
        </View>

        {/* METRICS GRID (FIXED) */}
        <View className="flex-row flex-wrap justify-between mb-5">

          {metrics.map((item, i) => (
            <View
              key={i}
              className="bg-white rounded-xl p-4 w-[48%] mb-3 shadow-sm"
            >
              {/* ICON + STATUS */}
              <View className="flex-row items-center justify-between mb-2">
                <View className="w-8 h-8 bg-[#01377D] rounded-full items-center justify-center">
                  <Icon type={item.type} />
                </View>

                <StatusBadge label={item.status} />
              </View>

              <Text className="text-2xl font-bold">{item.value}</Text>
              <Text className="text-xs text-gray-500">{item.desc}</Text>
            </View>
          ))}

        </View>

        {/* LOGS */}
        <View className="bg-[#E5E7EB] rounded-2xl p-5">

          <Text className="text-lg font-bold mb-4 text-[#0F172A]">
            Recent Automated Logs
          </Text>

          {logs.map((log, index) => {
            const isOld = index === logs.length - 1;
            const isLatest = index === 0;

            return (
              <View
                key={index}
                className={`bg-white rounded-xl p-4 mb-3 border ${
                  isLatest ? 'border-green-500' : 'border-gray-100'
                } ${isOld ? 'opacity-50' : ''}`}
              >

                {/* TOP */}
                <View className="flex-row justify-between mb-3">
                  <View>
                    <Text className="font-semibold">{log.time}</Text>
                    <Text className="text-xs text-gray-400">{log.date}</Text>
                  </View>
                  <View className="w-5 h-5 rounded-full bg-green-600" />
                </View>

                {/* METRICS */}
                <View className="flex-row justify-between">

                  {[
                    { label: 'TEMP', value: log.temp, status: log.tempStatus },
                    { label: 'PH', value: log.ph, status: log.phStatus },
                    { label: 'NH₃', value: log.ammonia, status: log.ammoniaStatus },
                    { label: 'NTU', value: log.turbidity, status: log.turbidityStatus },
                  ].map((item, i) => (
                    <View key={i} className="flex-1 items-center">
                      <Text className="text-[10px] text-gray-400">
                        {item.label}
                      </Text>
                      <Text className="font-bold">{item.value}</Text>
                      <StatusBadge label={item.status} />
                    </View>
                  ))}

                </View>
              </View>
            );
          })}

        </View>

      </ScrollView>
    </View>
  );
}