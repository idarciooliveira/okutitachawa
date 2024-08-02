import { Alert, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/Screen";
import { MonoText } from "@/components/StyledText";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/components/InputText";
import ErrorLabel from "@/components/ErrorLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewEventProps, NewEventSchema } from "@/schema/new-event";
import Button from "@/components/Button";
import DatePicker from "expo-datepicker";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useAuth } from "@/context/auth";
import { saveDoc } from "@/services/api";
import { View } from "@/components/Themed";

export default function NewEvent() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams() as { id: string };

  const [selectDate, setSelectDate] = useState(new Date().toString());
  const [isLoading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewEventProps>({
    resolver: zodResolver(NewEventSchema),
  });

  const handleRegister = async (values: NewEventProps) => {
    const data = {
      note: values.nota,
      name: values.name,
      date: selectDate,
      animalId: id,
    };

    try {
      setLoading(true);
      if (user?.uid) {
        await saveDoc("events", data, user.uid);

        setLoading(false);

        Alert.alert("Evento registrado!");
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
        <MonoText>Data do Evento</MonoText>
        <DatePicker
          date={selectDate}
          onChange={(date) => setSelectDate(date)}
        />
      </View>
      <View style={{ gap: 8 }}>
        <MonoText>Nome do Evento</MonoText>
        <Controller
          name="name"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <InputText value={value} onChange={onChange} onBlur={onBlur} />
          )}
        />
        {errors.name && <ErrorLabel text={errors.name.message} />}
      </View>
      <View style={{ gap: 8 }}>
        <MonoText>OBS</MonoText>
        <Controller
          name="nota"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <InputText value={value} onChange={onChange} onBlur={onBlur} />
          )}
        />
        {errors.nota && <ErrorLabel text={errors.nota.message} />}
      </View>
      <Button title="Registrar Evento" onPress={handleSubmit(handleRegister)} />
    </Screen>
  );
}

const styles = StyleSheet.create({});
