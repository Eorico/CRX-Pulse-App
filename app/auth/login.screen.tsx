import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Leaf } from 'lucide-react-native';
import { useAuth } from '@/contexts/auth.context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handlelogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.replace('/pages/home.screen');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View className="flex-1 bg-[#F5F5DC] tfle">
      <View className="bg-[#3D5A3D] pt-16 pb-10 px-6 rounded-b-3xl items-center">
        <View className="w-24 h-24 rounded-full bg-[#5A7A5A] justify-center items-center mb-6">
          <Leaf color="#FFFFFF" size={48} />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">Welcome Back</Text>
        <Text className="text-[#E8E8D0] text-base">Sign in to your crx account</Text>
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

        <Text className="text-[#3D5A3D] text-sm font-semibold mt-4 mb-2">Password</Text>
        <TextInput
          className="bg-white rounded-xl p-4 text-base border border-gray-300"
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => router.push('/auth/forget-password.screen')}>
          <Text className="text-[#8B6F47] text-sm font-medium text-right mt-3">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#3D5A3D] rounded-xl py-4 items-center mt-8" onPress={handlelogin}>
          <Text className="text-white text-base font-bold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register.screen')}>
            <Text className="text-[#8B6F47] text-sm font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}