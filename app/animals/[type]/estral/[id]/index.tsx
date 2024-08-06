import { useAuth } from "@/context/auth";
import { getDocumentsById } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Screen from "@/components/Screen";
import { MonoText } from "@/components/StyledText";
import { View } from "@/components/Themed";
import Button from "@/components/Button";

type EstralProps = {
  id: string;
  animalId: string;
  userId: string;
  obs: string;
  startDate: string;
  endDate: string;
};

export default function Estrals() {
  const { user } = useAuth();
  const { id, type } = useLocalSearchParams() as { id: string; type: string };
  const [estrals, setEstrals] = useState<EstralProps[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    getEstralById();
  }, []);

  const getEstralById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocumentsById<EstralProps>("ciclos", "animalId", id).then((data) => {
          setEstrals(data);
        });
      }
    });
  };

  return (
    <Screen styles={{ paddingTop: 12 }}>
      <FlatList
        data={estrals}
        renderItem={({ item: estral, index }) => (
          <View style={[styles.card]} key={index}>
            <View style={styles.labelContainer}>
              <MonoText>Inicio</MonoText>
              <MonoText>{estral.startDate}</MonoText>
            </View>
            <View style={styles.labelContainer}>
              <MonoText>Fim</MonoText>
              <MonoText>{estral.endDate}</MonoText>
            </View>
            <View style={styles.labelContainer}>
              <MonoText>OBS</MonoText>
              <MonoText>{estral?.obs}</MonoText>
            </View>
          </View>
        )}
        refreshing={isLoading}
        onRefresh={() => getEstralById()}
        ListHeaderComponent={() => (
          <>
            {estrals.length == 0 && (
              <Button
                title="Registrar Novo Ciclo"
                onPress={() =>
                  router.push(`/animals/${type}/estral/${id}/register`)
                }
              />
            )}
          </>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    gap: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 12,
    marginTop: 12,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
