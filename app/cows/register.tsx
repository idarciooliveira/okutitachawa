import React, { useState, useTransition } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Colors from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RegisterCowProps, RegisterCowSchema } from "@/schema/RegisterCow";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "@/context/auth";
import Screen from "@/components/Screen";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import ErrorLabel from "@/components/ErrorLabel";
import { MonoText } from "@/components/StyledText";
import LoadingIndicator from "@/components/LoadingIndicator";
import DatePicker from "expo-datepicker";

import { saveDoc } from "@/services/api";
import { Picker } from "@react-native-picker/picker";

export default function CowRegister() {
  const { user } = useAuth();
  const [selectDate, setSelectDate] = useState(new Date().toString());

  const [isLoading, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterCowProps>({
    resolver: zodResolver(RegisterCowSchema),
  });

  const handleRegister = async (values: RegisterCowProps) => {
    startTransition(() => {
      if (user?.uid) {
        saveDoc(
          "gados",
          {
            ...values,
            dataDeNascimento: selectDate,
          },
          user.uid
        )
          .then(() => {
            Alert.alert("Gado registrado!");
            reset();
          })
          .catch((err: Error) => {
            Alert.alert(err.message);
          });
      }
    });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {isLoading && <LoadingIndicator loading={isLoading} />}
        <View style={{ gap: 8 }}>
          <MonoText>Raça</MonoText>
          <Controller
            name="raca"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors.raca && <ErrorLabel text={errors.raca.message} />}
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Apelido</MonoText>
          <Controller
            name="apelido"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors.apelido && <ErrorLabel text={errors.apelido.message} />}
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Tag ID</MonoText>
          <Controller
            name="tagId"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors.tagId && <ErrorLabel text={errors.tagId.message} />}
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Sexo</MonoText>
          <Controller
            name="genero"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <>
                <View style={styles.picker}>
                  <Picker
                    mode="dropdown"
                    selectedValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                  >
                    <Picker.Item value="Macho" label="Macho" />
                    <Picker.Item value="Fêmea" label="Fêmea" />
                  </Picker>
                </View>
              </>
            )}
          />
          {errors.genero && <ErrorLabel text={errors.genero.message} />}
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Peso(KG)</MonoText>
          <Controller
            name="peso"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText
                value={String(value ?? 0)}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.peso && <ErrorLabel text={errors.peso.message} />}
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Data de Nascimento</MonoText>
          <DatePicker
            date={selectDate}
            onChange={(date) => setSelectDate(date)}
          />
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Tag da Mãe</MonoText>
          <Controller
            name="tagIdMae"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors.tagIdMae && <ErrorLabel text={errors.tagIdMae.message} />}
        </View>
        <View style={{ gap: 8 }}>
          <MonoText>Tag da Mãe</MonoText>
          <Controller
            name="tagIdPai"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors.tagIdPai && <ErrorLabel text={errors.tagIdPai.message} />}
        </View>
        <Button title="Registrar Gado" onPress={handleSubmit(handleRegister)} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  picker: {
    borderColor: Colors.border,
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 8,
  },
});
