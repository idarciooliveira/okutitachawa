import { Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/Screen";
import { MonoText } from "@/components/StyledText";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import DatePicker from "expo-datepicker";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useAuth } from "@/context/auth";
import { saveDoc } from "@/services/api";
import { View } from "@/components/Themed";

type Input = {
  obs: string;
};
export default function Register() {
  const { user } = useAuth();
  const { id, type } = useLocalSearchParams() as { id: string; type: string };

  const [startDate, setStartDate] = useState(new Date().toString());
  const [endDate, setEndDate] = useState(new Date().toString());
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<Input>();

  const handleRegister = async (values: Input) => {
    const data = {
      obs: values.obs ?? "",
      startDate,
      endDate,
      type,
      animalId: id,
      poestro: 2,
      estro: type == "cows" ? 1 : 2,
      metaestro: 4,
      distro: 14,
    };

    try {
      setLoading(true);
      if (user?.uid) {
        await saveDoc("ciclos", data, user.uid);
        setLoading(false);

        Alert.alert("Ciclo registrado!");
        reset();
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <Screen styles={{ gap: 12, paddingTop: 10 }}>
      <LoadingIndicator loading={isLoading} />
      <View style={{ gap: 8 }}>
        <MonoText>Inicio do Ciclo</MonoText>
        <DatePicker
          date={startDate}
          onChange={(date) => setStartDate(date.toString())}
        />
      </View>
      <View style={{ gap: 8 }}>
        <MonoText>Fim do Ciclo</MonoText>
        <DatePicker
          date={endDate}
          onChange={(date) => setEndDate(date.toString())}
        />
      </View>
      <View style={{ gap: 8 }}>
        <MonoText>OBS</MonoText>
        <Controller
          name="obs"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <InputText value={value} onChange={onChange} onBlur={onBlur} />
          )}
        />
      </View>
      <Button title="Registrar Ciclo" onPress={handleSubmit(handleRegister)} />
    </Screen>
  );
}
