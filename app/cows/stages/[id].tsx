import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/Screen";
import { MonoText } from "@/components/StyledText";

export default function ChangeStage() {
  const { id } = useLocalSearchParams() as { id: string };

  return (
    <Screen>
      <MonoText>{id}</MonoText>
    </Screen>
  );
}
