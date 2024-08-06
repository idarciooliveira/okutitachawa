import { StyleSheet } from "react-native";

import Screen from "@/components/Screen";
import MenuItem from "@/components/MenuItem";
import { countDocuments } from "@/services/api";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";

type ReportResult = {
  numberOfCows: number;
  numberOfPigs: number;
  numberOfGoats: number;
};

export default function Reports() {
  const { user } = useAuth();
  const [reportResult, setReportResult] = useState<ReportResult>({
    numberOfCows: 0,
    numberOfGoats: 0,
    numberOfPigs: 0,
  });

  useEffect(() => {
    loadingData();
  }, [user]);

  const loadingData = async () => {
    if (user?.uid) {
      const cows = await countDocuments("animals", user.uid, "tipo", "cows");
      const pigs = await countDocuments("animals", user.uid, "tipo", "pigs");
      const goats = await countDocuments("animals", user.uid, "tipo", "goats");

      setReportResult({
        numberOfCows: cows,
        numberOfGoats: goats,
        numberOfPigs: pigs,
      });
    }
  };

  return (
    <Screen styles={styles.container}>
      <MenuItem
        text={`${reportResult.numberOfCows}`}
        image={require("../../assets/images/animals/male-cow.png")}
        onPress={() => {}}
      />
      <MenuItem
        text={`${reportResult.numberOfGoats}`}
        image={require("../../assets/images/animals/male-goat.png")}
        onPress={() => {}}
      />
      <MenuItem
        text={`${reportResult.numberOfPigs}`}
        image={require("../../assets/images/animals/male-pig.png")}
        onPress={() => {}}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  qrCodeButton: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    padding: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  qrCodeText: { fontSize: 12, flex: 2 },
});
