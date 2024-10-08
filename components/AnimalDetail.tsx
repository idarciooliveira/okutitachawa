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
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

type AnimalProps = {
  id: string;
  tipo: string;
  raca: string;
  apelido: string;
  tagId: string;
  genero: string;
  peso: string;
  dataDeNascimento: string;
  tagIdMae: string;
  tagIdPai: string;
};

export default function AnimalDetailPage() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams() as { id: string };
  const [animal, setAnimal] = useState<AnimalProps | null>(null);
  const [pai, setPai] = useState<AnimalProps | null>(null);
  const [mae, setMae] = useState<AnimalProps | null>(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    getAnimalById();
  }, []);

  const getAnimalById = async () => {
    startTransition(() => {
      if (user?.uid) {
        getDocById<AnimalProps>(id, "animals").then(async (responseChild) => {
          setAnimal(responseChild);
          if (!responseChild.tagIdPai) return;
          getDocById<AnimalProps>(responseChild.tagIdPai, "animals").then(
            (data) => {
              if (!data) return;
              setPai(data);
            }
          );

          if (!responseChild.tagIdMae) return;
          getDocById<AnimalProps>(responseChild.tagIdMae, "animals").then(
            (data) => {
              if (!data) return;
              setMae(data);
            }
          );
        });
      }
    });
  };

  const handleDate = (date: string) => {
    const [year, month, day] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
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
            <MonoText>{animal?.tagId}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Apelido</MonoText>
            <MonoText>{animal?.apelido}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Idade</MonoText>
            {animal?.dataDeNascimento && (
              <MonoText>
                {formatDistanceToNowStrict(
                  handleDate(animal.dataDeNascimento),
                  {
                    locale: ptBR,
                  }
                )}
              </MonoText>
            )}
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Genero</MonoText>
            <MonoText>{animal?.genero}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Peso</MonoText>
            <MonoText>{animal?.peso} KG</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Raça</MonoText>
            <MonoText>{animal?.raca}</MonoText>
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Tag Id Mãe</MonoText>
            {mae && (
              <MonoText>
                {mae?.apelido}-{mae.tagId}
              </MonoText>
            )}
          </View>
          <View style={styles.labelContainer}>
            <MonoText>Tag Id Pai</MonoText>
            {pai && (
              <MonoText>
                {pai.apelido}-{pai.tagId}
              </MonoText>
            )}
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
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
