import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MonoText } from "./StyledText";
import { useColorScheme } from "./useColorScheme";
import Colors from "@/constants/Colors";

type Props = {
  TagId: string;
  apelido: string;
  genero: string;
  tipo: string;
  onPress: () => void;
};

export default function AnimalCard({
  TagId,
  apelido,
  genero,
  tipo,
  onPress,
}: Props) {
  const color = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor:
            color == "light" ? Colors.light.background : Colors.dark.background,
        },
      ]}
    >
      <View style={styles.insideContainer}>
        {tipo == "cows" && (
          <>
            {genero == "Macho" ? (
              <Image
                style={styles.image}
                source={require("../assets/images/animals/male-cow.png")}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/images/animals/famale-cow.png")}
              />
            )}
          </>
        )}

        {tipo == "pigs" && (
          <>
            {genero == "Macho" ? (
              <Image
                style={styles.image}
                source={require("../assets/images/animals/male-pig.png")}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/images/animals/famale-pig.png")}
              />
            )}
          </>
        )}

        {tipo == "goats" && (
          <>
            {genero == "Macho" ? (
              <Image
                style={styles.image}
                source={require("../assets/images/animals/male-goat.png")}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/images/animals/famale-goat.png")}
              />
            )}
          </>
        )}

        <View style={styles.info}>
          <MonoText>{TagId}</MonoText>
          <MonoText>{apelido}</MonoText>
        </View>
      </View>
      <View style={styles.insideContainer}>
        <View style={styles.info}>
          <MonoText>{genero}</MonoText>
        </View>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color={color == "light" ? Colors.light.text : Colors.dark.text}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderRadius: 6,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  insideContainer: {
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: "cover",
  },
  info: {},
});
