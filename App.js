import { StatusBar } from "expo-status-bar";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from './Screens/RegistrationScreen';

export default function App() {

  return (
    <>
      <RegistrationScreen />
      {/* <LoginScreen/> */}
      <StatusBar style="auto" />
    </>

  );
}

