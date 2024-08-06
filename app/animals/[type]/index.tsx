import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Colors from "@/constants/Colors";
import AnimalCard from "@/components/AnimalCard";
import { useColorScheme } from "@/components/useColorScheme";
import { MonoText } from "@/components/StyledText";
import { getDocuments } from "@/services/api";
import { IActionProps } from "react-native-floating-action";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";

type AnimalProps = {
  id: string;
  genero: string;
  apelido: string;
  userId: string;
  tagId: string;
  tipo: string;
};

const actions: IActionProps[] = [
  {
    name: "new_animal",
    icon: <MaterialIcons name="add" size={32} color={"white"} />,
  },
];

export default function Animals() {
  const color = useColorScheme();
  const { type } = useLocalSearchParams() as { type: string };
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState<AnimalProps[]>([]);

  useEffect(() => {
    loadingAnimals();
  }, []);

  const loadingAnimals = async () => {
    if (user) {
      setLoading(true);
      const data = await getDocuments<AnimalProps>("animals", user.uid, type);
      setAnimals(data);
      setLoading(false);
    }
  };

  const handleRegister = () => router.push(`/animals/${type}/register`);

  return (
    <>
      <FlatList
        data={animals}
        onRefresh={async () => await loadingAnimals()}
        refreshing={loading}
        style={[
          styles.container,
          {
            backgroundColor:
              color == "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
        ListHeaderComponentStyle={styles.separator}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <MonoText>{!loading && "Nenhum animal registrado"}</MonoText>
        )}
        renderItem={({ item }) => (
          <AnimalCard
            onPress={() => router.push(`/animals/${type}/${item.id}`)}
            TagId={item.tagId}
            tipo={item.tipo}
            apelido={item.apelido}
            genero={item.genero}
          />
        )}
      />
      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        visible={true}
        onPressItem={handleRegister}
        color={Colors.primary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  separator: {
    paddingBottom: 12,
  },
  searchbar: {
    width: "100%",
    height: 45,
    backgroundColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
});
