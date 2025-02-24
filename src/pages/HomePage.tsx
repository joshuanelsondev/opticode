import { useState } from "react";
import ICD10Autocomplete from "@/components/ICD10Autocomplete";
import RecentCodes from "@/components/RecentCodes";
import ScriptLibrary from "@/components/ScriptLibray";

export default function Home() {
  const [selectedCode, setSelectedCode] = useState("");

  return (
    <main>
      {/* Autocomplete Component */}
      <ICD10Autocomplete
        onSelect={(selectedCode) => setSelectedCode(selectedCode)}
      />

      {/* Display Selected Code */}
      {selectedCode && (
        <div>
          <strong>Selected Code:</strong> {selectedCode}
        </div>
      )}

      <RecentCodes />
      <ScriptLibrary />
    </main>
  );
}
