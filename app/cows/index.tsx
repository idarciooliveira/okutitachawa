import { View, Text } from "react-native";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function Cows() {
  return (
    <View>
      <Text>Cows</Text>
      <Button title="detail" onPress={() => router.push("/cows/dasdad")} />
    </View>
  );
}
