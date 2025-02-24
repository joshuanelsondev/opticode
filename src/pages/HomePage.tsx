import React from "react";
import { useState } from "react";
import ICD10Autocomplete from "@/components/ICD10Autocomplete";

export default function Home() {
  const [selectedCode, setSelectedCode] = useState("");

  return (
    <main>
      <h1>Code Lookup</h1>

      {/* Autocomplete Component */}
      <ICD10Autocomplete onSelect={(code) => setSelectedCode(code)} />

      {/* Display Selected Code */}
      {setSelectedCode && (
        <div>
          <strong>Selected Code:</strong> {selectedCode}
        </div>
      )}
    </main>
  );
}
