import { useAuth } from "@/context/auth";
import { getDocumentsById } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { StyleSheet } from "react-native";
import Screen from "@/components/Screen";
import Colors from "@/constants/Colors";
import LoadingIndicator from "@/components/LoadingIndicator";
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
  const { id } = useLocalSearchParams() as { id: string };
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
      {isLoading ? (
        <LoadingIndicator loading={isLoading} />
      ) : (
        <>
          <Button
            title="Registrar Novo Ciclo"
            onPress={() => router.push(`/cows/estral/${id}/register`)}
          />
          {estrals &&
            estrals.map((event) => (
              <View style={[styles.card]} key={event.id}>
                <View style={styles.labelContainer}>
                  <MonoText>Inicio</MonoText>
                  <MonoText>{event.startDate}</MonoText>
                </View>
                <View style={styles.labelContainer}>
                  <MonoText>Fim</MonoText>
                  <MonoText>{event.endDate}</MonoText>
                </View>
                <View style={styles.labelContainer}>
                  <MonoText>OBS</MonoText>
                  <MonoText>{event?.obs}</MonoText>
                </View>
              </View>
            ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    borderTopWidth: 30,
    borderTopColor: Colors.primary,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 4,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
