import { useAuth } from "@/context/auth";
import { getDocumentsById } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { StyleSheet } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import { MonoText } from "./StyledText";
import Screen from "@/components/Screen";
import Colors from "@/constants/Colors";
import { View } from "./Themed";

type EventProps = {
  id: string;
  animalId: string;
  name: string;
  note: string;
  date: string;
};

export default function EventDetail() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams() as { id: string };
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    getEventById();
  }, []);

  const getEventById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocumentsById<EventProps>("events", "animalId", id).then((data) => {
          setEvents(data);
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
          {events &&
            events.map((event) => (
              <View style={[styles.card]} key={event.id}>
                <MonoText style={{ marginBottom: 16, fontWeight: "bold" }}>
                  Evento: {event?.name}
                </MonoText>
                <View style={styles.labelContainer}>
                  <MonoText>OBS</MonoText>
                  <MonoText>{event?.note}</MonoText>
                </View>
                <View style={styles.labelContainer}>
                  <MonoText>Date</MonoText>
                  <MonoText>{event.date}</MonoText>
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
