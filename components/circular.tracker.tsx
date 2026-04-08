import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressProps {
  value: number;
  maxValue: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function CircularProgress({
  value,
  maxValue,
  label,
  size = 80,
  strokeWidth = 8,
  color = '#3D5A3D',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / maxValue) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className="items-center">
      <View className="relative justify-center items-center" style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View className="absolute justify-center items-center">
          <Text className="text-[18px] font-bold text-gray-800">{value}</Text>
        </View>
      </View>
      <Text className="mt-2 text-[14px] font-medium text-gray-500">{label}</Text>
    </View>
  );
}