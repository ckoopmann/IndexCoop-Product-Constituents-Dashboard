import React from "react";
import ComponentsGraph from "./components/ComponentsGraph";
import "./App.css";

function App() {
  document.title = "Index Component Marketcaps";
  return (
    <div className="App">
      <ComponentsGraph name="DPI" />
      <ComponentsGraph name="MVI" />
      <ComponentsGraph name="DATA" />
    </div>
  );
}

export default App;
