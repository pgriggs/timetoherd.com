import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./App.css";
import { readRemoteFile } from "react-papaparse";
import { ToastContainer, Slide } from "react-toastify";
import {
  PieChartTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import NumericInput from "react-numeric-input";
import { TimeToHerdCountAsHTML } from "./components/time-to-herd/time-to-herd";
import { CountryDropdown } from "./components/country-dropdown/country-dropdown";
import { MapChart } from "./components/map-chart/map-chart";
import { Methodology } from "./components/methodology/methodology";
import { Supporters } from "./components/supporters/supporters";
import { SocialSharingButton } from "./components/social-sharing/social-sharing-button";
import { CountriesTable } from "./components/countries-table/countries-table";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { MediaFeatures } from "./components/media-features/media-features";
// import { CountriesTable } from "./components/countries-table/countries-table.js";
// import { CountriesMasterList } from "./shared/data-factory.js";

document.body.addEventListener(
  "wheel",
  (e) => {
    if (e.path.includes(document.getElementById("the-country-map"))) {
      e.preventDefault();
    }
  },
  { passive: false }
);

export default function App() {
  const [allVaccineData, setAllVaccineData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "United States",
    iso_code: "USA",
  });
  const [content, setContent] = useState("");
  const [
    herdImmunityThresholdPercentage,
    setHerdImmunityThresholdPercentage,
  ] = useState(70);

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
          return setAllVaccineData(results.data);
        },
      }
    );
  }, [setAllVaccineData]);

  useEffect(() => {
    get_all_vaccine_data();
  }, [get_all_vaccine_data]);

  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          transition={Slide}
          limit={5}
        />
        <Switch>
          <Route path="/supporters">
            <header>
              <Link to="/" style={{ color: "#fff", fontSize: "28px" }}>
                <ArrowLeftOutlined />
              </Link>
              <nav>
                <Link to="/supporters">Supporters</Link>
                <Link to="/methodology">Methodology</Link>
                <SocialSharingButton />
              </nav>
            </header>
            <Supporters />
          </Route>
          <Route path="/methodology">
            <header>
              <Link to="/" style={{ color: "#fff", fontSize: "28px" }}>
                <ArrowLeftOutlined />
              </Link>
              <nav>
                <Link to="/supporters">Supporters</Link>
                <Link to="/methodology">Methodology</Link>
                <SocialSharingButton />
              </nav>
            </header>
            <Methodology />
          </Route>
          <Route exact path="/">
            <header>
              <nav>
                <Link to="/supporters">Supporters</Link>
                <Link to="/methodology">Methodology</Link>
                <SocialSharingButton />
              </nav>
            </header>
            <div className="App-header">
              <div className="country-section">
                <div className="hero-container">
                  <span className="time-to-heard-number">
                    <TimeToHerdCountAsHTML
                      selectedCountry={selectedCountry}
                      allVaccineData={allVaccineData}
                      requestedData="timetoherd"
                      requestedDataAsPercent={false}
                      herdImmunityThresholdPercentage={
                        herdImmunityThresholdPercentage
                      }
                    />
                  </span>
                  <span className="time-to-heard-unit">
                    &nbsp;days{" "}
                    <ExclamationCircleOutlined
                      data-tip="Days = [(Population * 0.7) - (Vaccine Doses Delivered * 0.5)] / (Average Daily Vaccine Doses Given * 0.5) "
                      style={{
                        marginLeft: "-8px",
                        fontSize: "16px",
                        verticalAlign: "super",
                      }}
                    />
                  </span>
                </div>
                <p className="subheader">
                  until {herdImmunityThresholdPercentage}% of the population is
                  vaccinated against COVID-19 in{" "}
                  <span className="selected-country-text">
                    <CountryDropdown
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                    />
                  </span>
                </p>
                <span className="asterisk">
                  *at current average daily vaccination rates
                </span>
                <p className="country-meta-data">
                  <span className="datapoint">
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                    <TimeToHerdCountAsHTML
                      selectedCountry={selectedCountry}
                      allVaccineData={allVaccineData}
                      requestedData="percentPopulationVaccinated"
                      requestedDataAsPercent
                      herdImmunityThresholdPercentage={
                        herdImmunityThresholdPercentage
                      }
                    />{" "}
                    % of population vaccinated
                    <ExclamationCircleOutlined
                      data-tip="Percent Vaccinated = (Total Vaccine Doses Administered * 0.5) / Population"
                      style={{
                        marginLeft: "4px",
                        fontSize: "14px",
                        marginTop: "-12px",
                      }}
                    />
                  </span>
                  <span className="datapoint">
                    <PieChartTwoTone />
                    <TimeToHerdCountAsHTML
                      selectedCountry={selectedCountry}
                      allVaccineData={allVaccineData}
                      requestedData="dailyVaccinationRateAsPercentPopulation"
                      requestedDataAsPercent
                      herdImmunityThresholdPercentage={
                        herdImmunityThresholdPercentage
                      }
                    />{" "}
                    % of population vaccinated daily
                    <ExclamationCircleOutlined
                      data-tip="Average Doses Administered Daily as a Percentage of Population =
                      (7-Day Moving Average of Daily Doses Delivered / Population) * 100"
                      style={{
                        marginLeft: "4px",
                        fontSize: "14px",
                        marginTop: "-12px",
                      }}
                    />
                  </span>
                  <span className="datapoint">
                    <HeartTwoTone twoToneColor="#eb2f96" />
                    <span className="datapoint-value">
                      <NumericInput
                        min={50}
                        max={95}
                        value={herdImmunityThresholdPercentage}
                        onChange={(valueAsNumber) => {
                          if (
                            Number.isNaN(valueAsNumber) ||
                            valueAsNumber > 95 ||
                            valueAsNumber < 50
                          ) {
                            setHerdImmunityThresholdPercentage(70);
                          } else {
                            setHerdImmunityThresholdPercentage(valueAsNumber);
                          }
                        }}
                        format={(valueAsNumber) => `${valueAsNumber}%`}
                      />{" "}
                    </span>
                    &nbsp; to reach herd immunity
                    <ExclamationCircleOutlined
                      data-tip="The exact herd immunity threshold for Covid-19 is unkown. Assuming herd immunity is possible with COVID-19 through vaccination, infectious disease experts estimate it to be between 70-95%."
                      style={{
                        marginLeft: "4px",
                        fontSize: "14px",
                        marginTop: "-12px",
                      }}
                    />
                  </span>
                </p>
                <div id="the-country-map">
                  <MapChart
                    setTooltipContent={setContent}
                    setSelectedCountry={setSelectedCountry}
                    selectedCountry={selectedCountry}
                  />
                </div>
                <span className="footer-link-container">
                  <span>
                    Made by &nbsp;
                    <a
                      className="footer-link"
                      target="_blank"
                      href="https://twitter.com/PeterGriggs"
                    >
                      @PeterGriggs
                    </a>
                  </span>
                  <span className="divider"></span>
                  <span>
                    Supported by &nbsp;
                    <a
                      className="footer-link"
                      target="_blank"
                      href="https://deepai.org/"
                    >
                      DeepAI
                    </a>
                  </span>
                </span>
                <ReactTooltip>{content}</ReactTooltip>
              </div>
              <MediaFeatures />
              <CountriesTable
                allVaccineData={allVaccineData}
                herdImmunityThresholdPercentage={
                  herdImmunityThresholdPercentage
                }
              />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
