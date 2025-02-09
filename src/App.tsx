import { useState } from "react";
import "./App.scss";
import ICD10Autocomplete from "./components/ICD10Autocomplete";

function App() {
  const [selectedCode, setSelectedCode] = useState("");

  return (
    <div>
      <h1>Code Lookup</h1>

      {/* Autocomplete Component */}
      <ICD10Autocomplete onSelect={(code) => setSelectedCode(code)} />

      {/* Display Selected Code */}
      {setSelectedCode && (
        <div>
          <strong>Selected Code:</strong> {selectedCode}
        </div>
      )}
    </div>
  );
}

export default App;
