import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_ICD10_API_URL;

const ICD10Autocomplete = ({
  onSelect,
}: {
  onSelect: (code: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { code: string; description: string }[]
  >([]);
  const [showDropdown, setShowdropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch ICD-10 suggestions based on user input
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            terms: query,
            sf: "code, name",
            maxList: 10,
          },
        });

        const result = response.data[3] || [];
        setSuggestions(
          result.map(([code, description]: [string, string]) => ({
            code,
            description,
          }))
        );
        setShowDropodown(true);
      } catch (error) {
        console.error("Error fetching ICD-10 data:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef}>
      <input
        type="text"
        placeholder="Search Code..."
        value={query}
        onChange={(e = setShowdropdown(true))}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul>
          {suggestions.map((item) => (
            <li
              key={item.code}
              onClick={() => {
                setQuery(`${item.code} -  ${item.description}`);
                setShowDropdown(false);
                onSelect(item.code);
              }}
            >
              <strong>{item.code}</strong> - {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ICD10Autocomplete;
