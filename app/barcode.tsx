import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "@/components/Screen";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { getDocById } from "@/services/api";
import { router } from "expo-router";
type AnimalProps = {
  id: string;
  apelido: string;
};
export default function Barcode() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [count, setCount] = useState(0);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Screen styles={styles.container}>
        <MonoText style={styles.message}>
          Precisamos da sua permissão para abrir a camera
        </MonoText>
        <Button onPress={requestPermission} title="grant permission" />
      </Screen>
    );
  }

  function toggleCameraFacing() {
    //@ts-ignore
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function searchForBarcode(barcode: string) {
    setCount((value) => value + 1);
    const cow = await getDocById<AnimalProps>(barcode, "gados");
    if (cow.id === barcode && count == 1) router.replace(`/cows/${cow.id}`);
    setCount(0);
  }

  return (
    <Screen styles={styles.container}>
      <CameraView
        onBarcodeScanned={({ data }) => searchForBarcode(data)}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MonoText style={styles.text}>Flip Camera</MonoText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.back();
            }}
          >
            <MonoText style={styles.text}>Cancelar</MonoText>
          </TouchableOpacity>
        </View>
      </CameraView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
