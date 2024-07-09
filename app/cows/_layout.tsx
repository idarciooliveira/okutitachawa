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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Gados",
          headerLeft: (cx) => (
            <AntDesign
              color={"#fff"}
              onPress={() => router.back()}
              size={24}
              name="arrowleft"
            />
          ),
        }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
