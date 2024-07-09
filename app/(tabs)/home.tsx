import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Button from '@/components/Button';
import Screen from '@/components/Screen';
import { MonoText } from '@/components/StyledText';
import { useAuth } from '@/context/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';

export default function HomeScreen() {
  const { user } = useAuth()
  return (
    <Screen>
      <MonoText>Welcome, {user?.email}</MonoText>
      <Button title='signout'
        onPress={()=> signOut(auth)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({

});
