import { useAuth } from "@/context/auth";
import { getDocumentsById } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { MonoText } from "./StyledText";
import { View } from "./Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

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
  const color = useColorScheme();

  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    getEventById();
  }, []);

  const getEventById = () => {
    startTransition(() => {
      if (user?.uid) {
        getDocumentsById<EventProps>("events", "animalId", id).then((data) => {
          setEvents(data);
        });
      }
    });
  };

  return (
    <FlatList
      style={[
        styles.container,
        {
          backgroundColor:
            color == "light" ? Colors.light.background : Colors.dark.background,
        },
      ]}
      refreshing={isLoading}
      onRefresh={() => getEventById()}
      data={events}
      renderItem={({ item: event, index }) => (
        <View style={[styles.card]} key={index}>
          <MonoText style={{ marginBottom: 16, fontWeight: "bold" }}>
            Evento {event?.name}
          </MonoText>
          <View style={styles.labelContainer}>
            <MonoText>OBS</MonoText>
            <MonoText numberOfLines={40}>{event?.note}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Dia do Evento</MonoText>
            <MonoText>{event.date}</MonoText>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  card: {
    borderRadius: 10,
    padding: 12,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
