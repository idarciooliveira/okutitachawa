import React from "react";
import { MonoText } from "./StyledText";
import { View } from "./Themed";

export default function CalendarLabel() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 12,
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <>
        <MonoText>Poestro</MonoText>
        <View
          style={{
            backgroundColor: "blue",
            height: 20,
            width: 20,
            borderRadius: 20,
          }}
        />
        <MonoText>Estro</MonoText>
        <View
          style={{
            backgroundColor: "pink",
            height: 20,
            width: 20,
            borderRadius: 20,
          }}
        />
      </>
      <>
        <MonoText>Metaestro</MonoText>
        <View
          style={{
            backgroundColor: "orange",
            height: 20,
            width: 20,
            borderRadius: 20,
          }}
        />
        <MonoText>Diestro</MonoText>
        <View
          style={{
            backgroundColor: "yellow",
            height: 20,
            width: 20,
            borderRadius: 20,
          }}
        />
      </>
    </View>
  );
}
