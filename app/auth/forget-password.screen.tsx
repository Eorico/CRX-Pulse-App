import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Leaf, ChevronLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/auth.context';

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    const success = await resetPassword(email);
    if (success) {
      Alert.alert('Success', 'Password reset link has been sent to your email', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } else {
      Alert.alert('Error', 'Failed to send reset link');
    }
  };

  return (
    <View className="flex-1 bg-[#F5F5DC]">
      <View className="bg-[#3D5A3D] pt-16 pb-10 px-6 rounded-b-3xl items-center relative">
        <TouchableOpacity
          className="absolute top-16 left-6 z-10"
          onPress={() => router.back()}
        >
          <ChevronLeft color="#FFFFFF" size={28} />
        </TouchableOpacity>

        <View className="w-24 h-24 rounded-full bg-[#5A7A5A] justify-center items-center mb-6">
          <Leaf color="#FFFFFF" size={48} />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">Reset Password</Text>
        <Text className="text-[#E8E8D0] text-base">Enter your email to reset</Text>
      </View>

      <View className="p-6">
        <Text className="text-[#3D5A3D] text-sm font-semibold mt-4 mb-2">Email</Text>
        <TextInput
          className="bg-white rounded-xl p-4 text-base border border-gray-300"
          placeholder="your@email.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          className="bg-[#3D5A3D] rounded-xl py-4 items-center mt-8"
          onPress={handleResetPassword}
        >
          <Text className="text-white text-base font-bold">Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}