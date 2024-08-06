import { StyleSheet, TouchableOpacity } from "react-native";

import Screen from "@/components/Screen";
import MenuItem from "@/components/MenuItem";
import { MonoText } from "@/components/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

export default function HomeScreen() {
  const color = useColorScheme();

  return (
    <Screen styles={styles.container}>
      <MenuItem
        text="Bovinos"
        image={require("../../assets/images/animals/male-cow.png")}
        onPress={() => {
          router.push("/animals/cows");
        }}
      />
      <MenuItem
        text="Cabras"
        image={require("../../assets/images/animals/male-goat.png")}
        onPress={() => {
          router.push("/animals/goats");
        }}
      />
      <MenuItem
        text="Suínos"
        image={require("../../assets/images/animals/male-pig.png")}
        onPress={() => {
          router.push("/animals/pigs");
        }}
      />
      <MenuItem
        text="Relatórios"
        image={require("../../assets/images/reports.png")}
        onPress={() => {
          router.push("/reports");
        }}
      />
      <TouchableOpacity
        onPress={() => router.push("/barcode")}
        style={[
          styles.qrCodeButton,
          {
            backgroundColor:
              color == "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
      >
        <MonoText style={styles.qrCodeText}>
          Leia o QR Code do seu animal, para obter mais informações
        </MonoText>
        <MaterialCommunityIcons
          color={color == "light" ? "#000" : "#fff"}
          size={60}
          name="qrcode-scan"
        />
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  qrCodeButton: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    padding: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  qrCodeText: { fontSize: 12, flex: 2 },
});
