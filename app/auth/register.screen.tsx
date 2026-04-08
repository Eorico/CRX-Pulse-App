import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Leaf } from 'lucide-react-native';
import { useAuth } from '@/contexts/auth.context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleregister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      router.replace('/auth/login.screen');
    } else {
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#F5F5DC]" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="bg-[#3D5A3D] pt-16 pb-10 px-6 rounded-b-3xl items-center">
        <View className="w-24 h-24 rounded-full bg-[#5A7A5A] justify-center items-center mb-6">
          <Leaf color="#FFFFFF" size={48} />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">Create Account</Text>
        <Text className="text-[#E8E8D0] text-base">Join us to start monitoring</Text>
      </View>

      <View className="p-6">
        <Text className="text-[#3D5A3D] text-sm font-semibold mt-4 mb-2">Full Name</Text>
        <TextInput
          className="bg-white rounded-xl p-4 text-base border border-gray-300"
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

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
          placeholder="Create a password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text className="text-[#3D5A3D] text-sm font-semibold mt-4 mb-2">Confirm Password</Text>
        <TextInput
          className="bg-white rounded-xl p-4 text-base border border-gray-300"
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-[#3D5A3D] rounded-xl py-4 items-center mt-8"
          onPress={handleregister}
        >
          <Text className="text-white text-base font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}