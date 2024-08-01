import { useWindowDimensions } from "react-native";
import React from "react";
import { View } from "@/components/Themed";
import { TabView, SceneMap } from "react-native-tab-view";
import CustomTabView from "@/components/CustomTabView";
import CowDetail from "@/components/CowDetail";

const CowEventsPage = () => (
  <View style={{ flex: 1, backgroundColor: "#2fe507" }} />
);

const renderScene = SceneMap({
  detail: () => <CowDetail />,
  event: CowEventsPage,
});

export default function Detail() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "detail", title: "Detalhe" },
    { key: "event", title: "Eventos" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={CustomTabView}
    />
  );
}
