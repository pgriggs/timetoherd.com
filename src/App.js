import React, { useState, useCallback, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import "./App.css";
import { TimeToHerdCount } from "./components/united-states/united-states";
import { CountryDropdown } from "./components/country-dropdown/country-dropdown.js";
import { readRemoteFile } from "react-papaparse";
import { MapChart } from "./components/map-chart/map-chart.js";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { CountriesMasterList } from "./shared/data-factory.js";

export default function App() {
  const [allVaccineData, setAllVaccineData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "United States",
    iso_code: "USA",
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    setSelectedCountry({
      name: "United States",
      iso_code: "USA",
    });
  }, [setSelectedCountry]);

  const get_all_vaccine_data = useCallback(() => {
    readRemoteFile(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv",
      {
        complete: (results) => {
          console.log(results.data);
          return setAllVaccineData(results.data);
        },
      }
    );
  }, [setAllVaccineData]);

  useEffect(() => {
    get_all_vaccine_data();
  }, [get_all_vaccine_data]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        transition={Slide}
        limit={5}
      />
      <header className="App-header">
        <div className="country-section">
          <div className="hero-container">
            <span className="time-to-heard-number">
              <TimeToHerdCount
                selectedCountry={selectedCountry}
                allVaccineData={allVaccineData}
              />
            </span>
            <span className="time-to-heard-unit">&nbsp;days</span>
          </div>
          <p className="subheader">
            until herd immunity to Covid-19 is reached in the{" "}
            <span className="selected-country-text">
              <CountryDropdown
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            </span>
          </p>
          <br></br>
          <MapChart
            setTooltipContent={setContent}
            setSelectedCountry={setSelectedCountry}
            selectedCountry={selectedCountry}
          />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      </header>
    </div>
  );
}
