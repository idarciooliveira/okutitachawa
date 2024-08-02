import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { useAuth } from "@/context/auth";
import { MonoText } from "@/components/StyledText";
import Button from "@/components/Button";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import Screen from "@/components/Screen";
import Colors from "@/constants/Colors";

export default function Account() {
  const { user } = useAuth();

  return (
    <Screen styles={styles.container}>
      <View style={styles.user}>
        <MonoText
          style={{
            fontSize: 38,
          }}
        >
          {user?.email?.slice(0, 1).toUpperCase()}
          {user?.email?.slice(1, 2).toUpperCase()}
        </MonoText>
      </View>
      <MonoText>{user?.email}</MonoText>
      <Button title="Terminar sessão" onPress={() => signOut(auth)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  user: {
    width: 100,
    height: 100,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
