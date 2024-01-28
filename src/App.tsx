import "./App.css";
import { EditableText } from "./components/EditableText.tsx";

function App() {
  return (
    <>
      <EditableText label={"Update your username"} placeholder={"John Doe"} />
    </>
  );
}

export default App;
