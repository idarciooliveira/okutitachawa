import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Stack, router } from "expo-router";

export default function HomeLayout() {
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
          title: "Gados",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhe",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Novo Gado",
        }}
      />
    </Stack>
  );
}
