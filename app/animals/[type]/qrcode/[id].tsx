import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/Screen";
import { MonoText } from "@/components/StyledText";
import QRCode from "react-native-qrcode-svg";

let base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..";

export default function QrCode() {
  const { id } = useLocalSearchParams() as { id: string };

  return (
    <Screen styles={{ gap: 12, alignItems: "center" }}>
      <MonoText>QR CODE</MonoText>
      <QRCode
        value={id}
        logo={{ uri: base64Logo }}
        logoSize={30}
        size={300}
        logoBackgroundColor="transparent"
      />
    </Screen>
  );
}
