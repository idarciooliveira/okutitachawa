import { useAuth } from "@/context/auth";
import { getDocById } from "@/services/api";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, startTransition, useState } from "react";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";

type AnimalProps = {
  id: string;
  genero: string;
};

export default function Actions() {
  const { user } = useAuth();
  const { id, type } = useLocalSearchParams() as { id: string; type: string };
  const [animal, setAnimal] = useState<AnimalProps | null>(null);

  useEffect(() => {
    getAnimalById();
  }, []);

  const getAnimalById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocById<AnimalProps>(id, "animals").then((data) => {
          setAnimal(data);
        });
      }
    });
  };

  return (
    <Menu>
      <MenuTrigger>
        <Feather color={"#fff"} size={24} name="more-vertical" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          value={1}
          text="Registar Evento"
          onSelect={() => router.push(`/animals/${type}/new-event/${id}`)}
        />
        {animal && animal.genero != "Macho" && (
          <MenuOption
            value={2}
            text="Ciclo estral"
            onSelect={() => router.push(`/animals/${type}/estral/${id}`)}
          />
        )}
        <MenuOption
          value={2}
          text="Codigo QR"
          onSelect={() => router.push(`/animals/${type}/qrcode/${id}`)}
        />
      </MenuOptions>
    </Menu>
  );
}
