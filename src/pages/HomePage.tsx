import { useState } from "react";
import ICD10Autocomplete from "@/components/ICD10Autocomplete";

export default function Home() {
  const [selectedCode, setSelectedCode] = useState("");

  return (
    <main>
      <h3>Code Search:</h3>

      {/* Autocomplete Component */}
      <ICD10Autocomplete onSelect={(code) => setSelectedCode(code)} />

      {/* Display Selected Code */}
      {selectedCode && (
        <div>
          <strong>Selected Code:</strong> {selectedCode}
        </div>
      )}
    </main>
  );
}
