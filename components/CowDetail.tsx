import { useAuth } from "@/context/auth";
import { getDocById } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useState, useTransition, useEffect } from "react";
import { StyleSheet } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import { MonoText } from "./StyledText";
import Screen from "@/components/Screen";
import Colors from "@/constants/Colors";
import { View } from "./Themed";

type CowProps = {
  id: string;
  raca: string;
  apelido: string;
  tagId: string;
  genero: string;
  peso: string;
  dataDeNascimento: string;
  tagIdMae: string;
  tagIdPai: string;
};

export default function CowDetailPage() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams() as { id: string };
  const [cow, setCow] = useState<CowProps | null>(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    getCowById();
  }, []);

  const getCowById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocById<CowProps>(id, "gados").then((data) => {
          setCow(data);
        });
      }
    });
  };

  return (
    <Screen styles={{ paddingTop: 12 }}>
      {isLoading ? (
        <LoadingIndicator loading={isLoading} />
      ) : (
        <View style={[styles.card]}>
          <MonoText style={{ marginBottom: 16, fontWeight: "bold" }}>
            Informações Gerais
          </MonoText>
          <View style={styles.labelContainer}>
            <MonoText>N da Tag</MonoText>
            <MonoText>{cow?.tagId}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Apelido</MonoText>
            <MonoText>{cow?.apelido}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Idade</MonoText>
            {cow?.dataDeNascimento && (
              <MonoText>{cow.dataDeNascimento}</MonoText>
            )}
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Genero</MonoText>
            <MonoText>{cow?.genero}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Peso</MonoText>
            <MonoText>{cow?.peso} KG</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Raça</MonoText>
            <MonoText>{cow?.raca}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Tag Id Mãe</MonoText>
            <MonoText>{cow?.tagIdMae}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Tag Id Pai</MonoText>
            <MonoText>{cow?.tagIdPai}</MonoText>
          </View>
        </View>
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
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
