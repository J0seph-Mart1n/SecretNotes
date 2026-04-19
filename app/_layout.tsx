import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider as AppThemeProvider } from '@/hooks/ThemeContext';

export const unstable_settings = {
  anchor: '(drawer)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppThemeProvider>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </AppThemeProvider>
  );
}