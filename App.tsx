import { PaperProvider } from 'react-native-paper'
import { AppContainer } from "./src/AppContainer";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <PaperProvider settings={{ rippleEffectEnabled: true }}>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
            <AppContainer/>
        </SafeAreaView>
    </PaperProvider>
  );
}