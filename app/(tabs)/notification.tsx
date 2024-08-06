import { useAuth } from "@/context/auth";
import { getAllDocuments } from "@/services/api";
import { useState, useTransition, useEffect } from "react";
import { StyleSheet } from "react-native";
import Screen from "@/components/Screen";
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

export default function Notification() {
  const { user } = useAuth();
  const [estrals, setEstrals] = useState<EstralProps[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getEstralById();
  }, []);

  const getEstralById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getAllDocuments<EstralProps>("ciclos", user.uid).then((data) => {
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
        name: "Diestro",
      };
      for (let j = 1; j < animal.distro; j++) {
        markedDatesTemp[format(addDays(metaestroEnd, j), "yyyy-MM-dd")] = {
          color: "yellow",
          name: "Diestro",
        };
      }
    }
    setMarkedDates(markedDatesTemp);
  };

  return (
    <Screen styles={styles.container}>
      <Calendar markedDates={markedDates} markingType="period" />
      <CalendarLabel />
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
