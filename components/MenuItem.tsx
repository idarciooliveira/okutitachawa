import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { ComicSans } from "./StyledText";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type Props = {
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

export default function MenuItem({ text, image, onPress }: Props) {
  const color = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor:
            color == "light" ? Colors.light.background : Colors.dark.background,
        },
      ]}
    >
      <Image style={styles.image} source={image} />
      <ComicSans style={{ fontSize: 20 }}>{text}</ComicSans>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "48%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 10,
    padding: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    resizeMode: "contain",
    width: 90,
    height: 90,
  },
});
