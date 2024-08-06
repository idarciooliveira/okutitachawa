import { useAuth } from "@/context/auth";
import { getDocumentsById } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Screen from "@/components/Screen";
import { MonoText } from "@/components/StyledText";
import { View } from "@/components/Themed";
import Button from "@/components/Button";
import { Calendar } from "react-native-calendars";
import { addDays, format } from "date-fns";
import CalendarLabel from "@/components/CalendarLabel";

type EstralProps = {
  id: string;
  animalId: string;
  userId: string;
  obs: string;
  startDate: string;
  endDate: string;
  poestro: number;
  estro: number;
  metaestro: number;
  distro: number;
};

export default function Estrals() {
  const { user } = useAuth();
  const { id, type } = useLocalSearchParams() as { id: string; type: string };
  const [estrals, setEstrals] = useState<EstralProps[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getEstralById();
  }, []);

  const getEstralById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocumentsById<EstralProps>("ciclos", "animalId", id).then((data) => {
          setEstrals(data);
          calculateEstralCycles(data[0]);
        });
      }
    });
  };

  const calculateEstralCycles = (animal: EstralProps) => {
    const cycleLength =
      animal.poestro + animal.metaestro + animal.distro + animal.estro;

    const [year, month, day] = animal.endDate.split("/").map(Number);
    const endDateObj = new Date(year, month - 1, day);

    const markedDatesTemp: any = {};

    for (let i = 0; i < 6; i++) {
      const cycleStartDate = addDays(endDateObj, i * cycleLength);
      const proestroEnd = addDays(cycleStartDate, animal.poestro);
      const estroEnd = addDays(proestroEnd, animal.estro);
      const metaestroEnd = addDays(estroEnd, animal.metaestro);

      markedDatesTemp[format(cycleStartDate, "yyyy-MM-dd")] = {
        startingDay: true,
        color: "blue", // Proestro color
        name: "Poestro",
      };
      for (let j = 1; j < animal.poestro; j++) {
        markedDatesTemp[format(addDays(cycleStartDate, j), "yyyy-MM-dd")] = {
          color: "blue",
          name: "Poestro",
        };
      }
      markedDatesTemp[format(proestroEnd, "yyyy-MM-dd")] = {
        color: "pink", // Estro color
        name: "Estro",
      };
      for (let j = 1; j < animal.estro; j++) {
        markedDatesTemp[format(addDays(proestroEnd, j), "yyyy-MM-dd")] = {
          color: "pink",
          name: "Estro",
        };
      }
      markedDatesTemp[format(estroEnd, "yyyy-MM-dd")] = {
        color: "orange", // Metaestro color
        name: "Metaestro",
      };
      for (let j = 1; j < animal.metaestro; j++) {
        markedDatesTemp[format(addDays(estroEnd, j), "yyyy-MM-dd")] = {
          color: "orange",
          name: "Metaestro",
        };
      }
      markedDatesTemp[format(metaestroEnd, "yyyy-MM-dd")] = {
        color: "yellow", // Diestro color
        marked: "Distro",
        name: "Poestro",
      };
      for (let j = 1; j < animal.distro; j++) {
        markedDatesTemp[format(addDays(metaestroEnd, j), "yyyy-MM-dd")] = {
          color: "yellow",
          name: "Distro",
        };
      }
    }
    setMarkedDates(markedDatesTemp);
  };

  return (
    <Screen styles={styles.container}>
      <Calendar markedDates={markedDates} markingType="period" />
      <CalendarLabel />
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
  container: { paddingTop: 12 },
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
