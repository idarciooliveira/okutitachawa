import { useEffect, useState } from "react";
import { router } from "expo-router";
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

type CowProps = {
  id: string;
  genero: string;
  apelido: string;
  userId: string;
  tagId: string;
};

const actions: IActionProps[] = [
  {
    name: "new_animal",
    icon: <MaterialIcons name="add" size={32} color={"white"} />,
  },
];

export default function Cows() {
  const color = useColorScheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cows, setCows] = useState<CowProps[]>([]);

  useEffect(() => {
    loadingCows();
  }, []);

  const loadingCows = async () => {
    if (user) {
      setLoading(true);
      const data = await getDocuments<CowProps>("gados", user.uid);
      setCows(data);
      setLoading(false);
    }
  };

  const handleRegister = () => router.push("/cows/register");

  return (
    <>
      <FlatList
        data={cows}
        onRefresh={async () => await loadingCows()}
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
        // ListHeaderComponent={() => (
        //   <TextInput
        //     style={styles.searchbar}
        //     autoCorrect={false}
        //     placeholder="Pesquisar"
        //   />
        // )}
        ListHeaderComponentStyle={styles.separator}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <MonoText>{!loading && "Nenhum gado registrado"}</MonoText>
        )}
        renderItem={({ item }) => (
          <AnimalCard
            onPress={() => router.push(`/cows/${item.id}`)}
            TagId={item.tagId}
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
