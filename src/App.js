import logo from "./logo.svg";
import "./App.css";
import GasPriceChart from "./GasPriceChart";

function App() {
  return (
    <div className="App">
      <h1>Gas Prices in the Last 48 Hours</h1>
      <div className="chart-container">
        <GasPriceChart />
      </div>
    </div>
  );
}

export default App;
