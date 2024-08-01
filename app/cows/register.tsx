import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Screen from "@/components/Screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RegisterCowProps, RegisterCowSchema } from "@/schema/RegisterCow";
import { MonoText } from "@/components/StyledText";
import InputText from "@/components/InputText";
import ErrorLabel from "@/components/ErrorLabel";
import Button from "@/components/Button";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { saveDoc } from "@/services/api";

export default function CowRegister() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterCowProps>({
    resolver: zodResolver(RegisterCowSchema),
  });

  const handleRegister = async (values: RegisterCowProps) => {
    try {
      setLoading(true);
      if (user?.uid) {
        await saveDoc("gados", values, user.uid);
        Alert.alert("Gado registrado!");
        reset();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Screen styles={{ gap: 12, paddingTop: 10 }}>
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
          <MonoText>Gênero</MonoText>
          <Controller
            name="genero"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText value={value} onChange={onChange} onBlur={onBlur} />
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
          <Controller
            name="dataDeNascimento"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputText
                value={value ? value.toString() : ""}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.dataDeNascimento && (
            <ErrorLabel text={errors.dataDeNascimento.message} />
          )}
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
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
});
