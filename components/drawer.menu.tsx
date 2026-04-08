import { View, Text, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { X, Hop as Home, Zap, Settings, LogOut as LogOutIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth.context';
import { useRef, useEffect, useState } from 'react';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const router = useRouter();
  const { signOut } = useAuth();
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible) setModalVisible(true);
  }, [visible]);

  useEffect(() => {
    if (!modalVisible) return;
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 300,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !visible) setModalVisible(false);
    });
  }, [visible, modalVisible]);

  const handleNavigate = (route: any) => {
    onClose();
    router.push(route);
  };

  const handleLogout = () => {
    signOut();
    router.replace('/auth/login.screen');
  };

  const menuItems = [
    { label: 'Home', icon: Home, route: '/pages/home.screen' },
    { label: 'Management', icon: Zap, route: '/pages/management.screen' },
    { label: 'Settings', icon: Settings, route: '/pages/settings' },
  ];

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      {/* ✅ flex-row: overlay on left, drawer on right */}
      <View className="flex-1 flex-row bg-black/50">
        <TouchableOpacity className="flex-1" onPress={onClose} />

        {/* ✅ Drawer naturally sits on the right, slides in from right */}
        <Animated.View
          className="w-[70%] bg-white h-full pt-10 px-5 pb-5"
          style={{ transform: [{ translateX: slideAnim }] }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-[20px] font-bold text-gray-800">Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#333" size={28} />
            </TouchableOpacity>
          </View>

          <View className="bg-green-800 py-3 px-4 rounded mb-6">
            <Text className="text-[14px] font-semibold text-white">Garden Monitor</Text>
          </View>

          <View className="flex-1 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center py-4 px-3 rounded gap-4"
                  onPress={() => handleNavigate(item.route)}
                >
                  <Icon color="#3D5A3D" size={20} />
                  <Text className="text-[16px] font-medium text-green-800">{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="pt-5 border-t border-gray-300">
            <TouchableOpacity
              className="bg-red-600 flex-row justify-center items-center py-3 rounded gap-2"
              onPress={handleLogout}
            >
              <LogOutIcon color="#fff" size={20} />
              <Text className="text-[16px] font-semibold text-white">Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}