import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [registry, setRegistry] = useState({});
  const [query, setQuery] = useState("");

  // Load entire registry
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
    fetch(`${apiBase}/api/strings`)
      .then((res) => res.json())
      .then((data) => setRegistry(data))
      .catch((err) => console.error("Failed to load registry:", err));
  }, []);

  const keys = Object.keys(registry);
  const filtered = keys.filter((k) =>
    k.toLowerCase().includes(query.toLowerCase()) ||
    registry[k].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <h1>CID Registry Viewer</h1>

      <input
        type="text"
        placeholder="Search strings…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search"
      />

      <div className="list">
        {filtered.map((key) => (
          <div key={key} className="item">
            <div className="key">{key}</div>
            <div className="value">{registry[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
