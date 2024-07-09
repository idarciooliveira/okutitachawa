import { TextInput, StyleSheet, View, FlatList } from "react-native";
import Colors from "@/constants/Colors";
import AnimalCard from "@/components/AnimalCard";
import { useColorScheme } from "@/components/useColorScheme";
import { FloatingAction } from "react-native-floating-action";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/services/firebaseConfig";
import { useAuth } from "@/context/auth";
import { MonoText } from "@/components/StyledText";

type CowProps = {
  id: string;
  genero: string;
  apelido: string;
  userId: string;
  tagId: string;
};

export default function Cows() {
  const { user } = useAuth();
  const color = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [cows, setCows] = useState<CowProps[]>([]);

  useEffect(() => {
    loadingCows();
  }, []);

  const loadingCows = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(database, "/gados"));
    const data = querySnapshot.docs
      .map((a) => a.data())
      .filter((a) => a.userId == user?.uid) as CowProps[];
    setCows(data);
    setLoading(false);
  };

  const handleRegister = () => router.push("/cows/register");

  return (
    <>
      <FlatList
        style={[
          styles.container,
          {
            backgroundColor:
              color == "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
        ListHeaderComponent={() => (
          <TextInput
            style={styles.searchbar}
            autoCorrect={false}
            placeholder="Pesquisar"
          />
        )}
        onRefresh={async () => await loadingCows()}
        refreshing={loading}
        ListHeaderComponentStyle={styles.separator}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <MonoText>Nenhum gado registrado</MonoText>}
        data={cows}
        renderItem={({ item }) => (
          <AnimalCard
            TagId={item.tagId}
            apelido={item.apelido}
            genero={item.genero}
          />
        )}
      />
      <FloatingAction
        visible={true}
        onPressMain={handleRegister}
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
