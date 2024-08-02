import { useAuth } from "@/context/auth";
import { getDocById } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import { MonoText } from "./StyledText";
import Screen from "@/components/Screen";
import Colors from "@/constants/Colors";

type EventProps = {
  id: string;
  data: Date;
  tagId: string;
  name: string;
  notas: string;
};

export default function EventDetailPage() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams() as { id: string };
  const [event, setEvent] = useState<EventProps | null>(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    getEventById();
  }, []);

  const getEventById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocById<EventProps>(id, "events").then((data) => {
          setEvent(data);
        });
      }
    });
  };

  return (
    <Screen styles={{ paddingTop: 0 }}>
      <LoadingIndicator loading={isLoading} />
      <View style={styles.card}>
        <MonoText style={{ marginBottom: 16, fontWeight: "bold" }}>
          Informações Gerais
        </MonoText>
        <View style={styles.labelContainer}>
          <MonoText>N da Tag</MonoText>
          <MonoText>{event?.tagId}</MonoText>
        </View>
        <View style={styles.labelContainer}>
          <MonoText>Apelido</MonoText>
          <MonoText>{event?.name}</MonoText>
        </View>
      </View>
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
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
