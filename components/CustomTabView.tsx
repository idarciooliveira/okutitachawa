import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
} from "react-native-tab-view";
import Colors from "@/constants/Colors";
import { MonoText } from "./StyledText";
import { useColorScheme } from "./useColorScheme";

type State = NavigationState<Route>;

export default function CustomTabView(
  props: SceneRendererProps & { navigationState: State }
) {
  const color = useColorScheme();

  return (
    <TabBar
      {...props}
      style={{
        backgroundColor:
          color == "light" ? Colors.light.background : Colors.dark.background,
      }}
      renderLabel={({ route, focused }) => {
        return (
          <MonoText style={{ color: focused ? Colors.primary : Colors.border }}>
            {route.title}
          </MonoText>
        );
      }}
      indicatorStyle={{
        backgroundColor: Colors.primary,
      }}
    />
  );
}

const styles = StyleSheet.create({});
