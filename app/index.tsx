import { Redirect } from "expo-router";
import { useAuth } from "@/context/auth";

export default function Page() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/signin" />;
  } else if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

}