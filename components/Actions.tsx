import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";

export default function Actions() {
  const { id, type } = useLocalSearchParams() as { id: string; type: string };

  return (
    <Menu>
      <MenuTrigger>
        <Feather color={"#fff"} size={24} name="more-vertical" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          value={1}
          text="Registrar Evento"
          onSelect={() => router.push(`/animals/${type}/new-event/${id}`)}
        />
        <MenuOption
          value={2}
          text="Ciclo estral"
          onSelect={() => router.push(`/animals/${type}/estral/${id}`)}
        />
        <MenuOption
          value={2}
          text="Codigo QR"
          onSelect={() => router.push(`/animals/${type}/qrcode/${id}`)}
        />
      </MenuOptions>
    </Menu>
  );
}
