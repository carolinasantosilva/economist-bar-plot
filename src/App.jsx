import DecorativeLine from "./components/DecorativeLine";
import ChartHeader from "./components/ChartHeader";
import BarPlot from "./components/BarPlot";
import ChartCaption from "./components/ChartCaption.jsx";

import "./App.css";

function App() {
  return (
    <main className="chart-container">
      <DecorativeLine />

      <ChartHeader
        title="Escape artists"
        subtitle="Number of laboratory-acquired infections, 1970-2021"
      />

      <BarPlot />

      <ChartCaption>
        Sources: Laboratory-Acquired Infection Database; American Biological Safety Association
      </ChartCaption>
      <ChartCaption>
      The Economist
      </ChartCaption>
    </main>
  );
}

export default App;