import "./App.css";

import { readRemoteFile } from "react-papaparse";
import { UnitedStates } from "./components/united-states/united-states";

export default function App() {
  const us_vaccine_data = () => {
    readRemoteFile(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/United%20States.csv",
      {
        complete: (results) => {
          console.log("Results:", results);
        },
      }
    );
  };

  us_vaccine_data();

  return (
    <div className="App">
      <header className="App-header">
        <UnitedStates />
      </header>
    </div>
  );
}
