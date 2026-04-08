import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-semibold">This screen doesn't exist.</Text>
        <Link href="/auth/login.screen" className="mt-4 py-4">
          <Text className="text-[#3D5A3D] font-medium">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}