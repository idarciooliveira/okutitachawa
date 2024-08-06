import {
  StyleSheet,
  TextInput,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";
import Colors from "@/constants/Colors";

interface Props extends TouchableOpacityProps {
  value: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
}

export default function InputText({
  value,
  onChange,
  secureTextEntry,
  ...props
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <TextInput
      {...props}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      onChangeText={onChange}
      value={value}
      style={[
        styles.input,
        { color: colorScheme == "dark" ? Colors.dark.text : Colors.light.text },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    paddingHorizontal: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
  },
});
