import { PaperProvider } from 'react-native-paper'
import { AppContainer } from "./src/AppContainer";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <PaperProvider settings={{ rippleEffectEnabled: true }}>
      <StatusBar style="auto" translucent={true}  backgroundColor={'transparent'} />
      <AppContainer/>
    </PaperProvider>
  );
}
