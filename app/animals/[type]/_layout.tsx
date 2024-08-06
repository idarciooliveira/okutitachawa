import Actions from "@/components/Actions";
import Colors from "@/constants/Colors";
import { TranslateAnimalType } from "@/utils/translate-animal-type";
import { AntDesign } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";

export default function HomeLayout() {
  const { type } = useLocalSearchParams() as { type: string };

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "ComicSansBold",
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <AntDesign
            color={"#fff"}
            onPress={() => router.back()}
            size={24}
            name="arrowleft"
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: TranslateAnimalType(type),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhe",
          headerRight: () => <Actions />,
        }}
      />
      <Stack.Screen
        name="new-event/[id]"
        options={{
          title: "Registrar Evento",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: `Registrar ${TranslateAnimalType(type)}`,
        }}
      />

      <Stack.Screen
        name="estral/[id]/index"
        options={{
          title: "Ciclo Estral",
        }}
      />
      <Stack.Screen
        name="estral/[id]/register"
        options={{
          title: `Registrar Ciclo Estral`,
        }}
      />
    </Stack>
  );
}
