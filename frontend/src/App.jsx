import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [registry, setRegistry] = useState({});
  const [query, setQuery] = useState("");

  // Load entire registry
  useEffect(() => {
    fetch("http://localhost:3001/api/strings")
      .then((res) => res.json())
      .then((data) => setRegistry(data));
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
