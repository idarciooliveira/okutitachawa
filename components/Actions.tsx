import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";

export default function Actions() {
  const { id } = useLocalSearchParams() as { id: string };

  return (
    <Menu>
      <MenuTrigger>
        <Feather color={"#fff"} size={24} name="more-vertical" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          value={1}
          text="Registrar Evento"
          onSelect={() => router.push(`/cows/new-event/${id}`)}
        />
        <MenuOption
          value={2}
          text="Alterar estado"
          onSelect={() => router.push(`/cows/stages/${id}`)}
        />
        <MenuOption
          value={2}
          text="Registrar ciclo estral"
          onSelect={() => router.push(`/cows/estral/${id}`)}
        />
        <MenuOption
          value={2}
          text="Codigo QR"
          onSelect={() => router.push(`/cows/qrcode/${id}`)}
        />
      </MenuOptions>
    </Menu>
  );
}
