import { StyleProp, ViewStyle } from "react-native";
import { View } from "./Themed";
import Constants from "expo-constants";
import { useColorScheme } from "./useColorScheme";
import Colors from "@/constants/Colors";

type Props = {
  children: any;
  styles?: StyleProp<ViewStyle>;
};
export default function Screen({ children, styles }: Props) {
  const color = useColorScheme();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: Constants.statusBarHeight,
          backgroundColor:
            color == "light" ? Colors.light.background : Colors.dark.background,
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
}
