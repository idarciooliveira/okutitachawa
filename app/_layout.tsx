import 'react-native-reanimated';
import { useContext, useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthContext, AuthProvider } from '@/context/auth';


export { ErrorBoundary } from 'expo-router';

export const unstable_settings = { initialRouteName: '/(tabs)' };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ComicSans: require('../assets/fonts/comic-sans-ms-regular.ttf'),
    ComicSansBold: require('../assets/fonts/comic-sans-ms-bold.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
        <RootLayoutNav />
    </AuthProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthContext)

  console.log('root' + user?.id)

  return (
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
             {user ? <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> :
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
             }
          </Stack>
        </ThemeProvider>
  );
}
