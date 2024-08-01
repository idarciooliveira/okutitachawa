import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function LoadingIndicator({ loading }: { loading: boolean }) {
  return (
    <ActivityIndicator
      animating={loading}
      size={"large"}
      color={Colors.primary}
    />
  );
}
