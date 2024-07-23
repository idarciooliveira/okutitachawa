import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/Screen";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/services/firebaseConfig";
import { useAuth } from "@/context/auth";

type CowProps = {
  id: string;
  genero: string;
  apelido: string;
  userId: string;
  tagId: string;
};

export default function Detail() {
  const { user } = useAuth();

  const { id } = useLocalSearchParams() as { id: string };

  const [loading, setLoading] = useState(false);
  const [cow, setCow] = useState<CowProps | null>(null);

  useEffect(() => {
    getCowById();
  }, []);

  const getCowById = async () => {
    setLoading(true);

    if (user?.uid) {
      const result = await getDoc(doc(database, "gados", id));
      const data = { ...result.data(), id: result.id } as CowProps;
      setCow(data);
    }

    setLoading(false);
  };
  return (
    <Screen>
      <Text>Detail</Text>
      <Text>{JSON.stringify(cow)}</Text>
    </Screen>
  );
}
