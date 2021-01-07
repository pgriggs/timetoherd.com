import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./App.css";
import { TimeToHerdCount } from "./components/time-to-herd/time-to-herd";
import { CountryDropdown } from "./components/country-dropdown/country-dropdown.js";
import { readRemoteFile } from "react-papaparse";
import { MapChart } from "./components/map-chart/map-chart.js";
import { ToastContainer, Slide } from "react-toastify";
import { Methodology } from "./components/methodology/methodology.js";
import { Supporters } from "./components/supporters/supporters.js";
import { SocialSharingButton } from "./components/social-sharing/social-sharing-button.js";
// import { CountriesTable } from "./components/countries-table/countries-table.js";
import {
  PieChartTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
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
    <Router>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
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
                    <TimeToHerdCount
                      selectedCountry={selectedCountry}
                      allVaccineData={allVaccineData}
                      requestedData="timetoherd"
                      requestedDataAsPercent={false}
                    />
                  </span>
                  <span className="time-to-heard-unit">
                    &nbsp;days{" "}
                    <ExclamationCircleOutlined
                      data-tip="Days = [(Population * 0.7) - (Vaccine Doses Delivered * 0.5)] / (Average Daily Vaccine Doses Given * 0.5) "
                      style={{
                        marginLeft: "-8px",
                        fontSize: "14px",
                        verticalAlign: "super",
                      }}
                    />
                  </span>
                </div>
                <p className="subheader">
                  until <h1 className="dummy-h1">herd immunity to Covid-19</h1>{" "}
                  is reached in the{" "}
                  <span className="selected-country-text">
                    <CountryDropdown
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                    />
                  </span>
                </p>
                <span className="asterisk">
                  *at current daily vaccination rates
                </span>
                <p className="country-meta-data">
                  <span className="datapoint">
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                    <TimeToHerdCount
                      selectedCountry={selectedCountry}
                      allVaccineData={allVaccineData}
                      requestedData="percentPopulationVaccinated"
                      requestedDataAsPercent={true}
                    />{" "}
                    % of population vaccinated
                    <ExclamationCircleOutlined
                      data-tip="Percent Vaccinated = (Total Vaccine Doses Administered * 0.5) / Population"
                      style={{
                        marginLeft: "4px",
                        fontSize: "12px",
                        marginTop: "-12px",
                      }}
                    />
                  </span>
                  <span className="datapoint">
                    <PieChartTwoTone />
                    <TimeToHerdCount
                      selectedCountry={selectedCountry}
                      allVaccineData={allVaccineData}
                      requestedData="dailyMovingAverageAsPercentPopulation"
                      requestedDataAsPercent={true}
                    />{" "}
                    % of population receiving the vaccine daily
                    <ExclamationCircleOutlined
                      data-tip="Average Doses Administered Daily as a Percentage of Population = [[(Total Doses Delivered as of Most Recent Reporting Date - Total Doses Delivered as of Initial Reporting Date) * 0.5] / (Days Between Initial Reporting Date &amp; Most Recent Reporting Date] / Population)"
                      style={{
                        marginLeft: "4px",
                        fontSize: "12px",
                        marginTop: "-12px",
                      }}
                    />
                  </span>
                  <span className="datapoint">
                    <HeartTwoTone twoToneColor="#eb2f96" />
                    <span className="datapoint-value">70% </span>needed to reach
                    herd immunity
                    <ExclamationCircleOutlined
                      data-tip="The exact herd immunity threshold for Covid-19 is unkown. Infectious disease experts estimate it to be between 60-90%."
                      style={{
                        marginLeft: "4px",
                        fontSize: "12px",
                        marginTop: "-12px",
                      }}
                    />
                  </span>
                </p>
                <MapChart
                  setTooltipContent={setContent}
                  setSelectedCountry={setSelectedCountry}
                  selectedCountry={selectedCountry}
                />
                <a
                  className="amzn-link"
                  target="_blank"
                  href="https://www.amazon.com/gp/search?ie=UTF8&tag=timetoherd-20&linkCode=ur2&linkId=dbaafa6eec05baa8aaf6d35592380e6f&camp=1789&creative=9325&index=aps&keywords=face mask"
                >
                  Need a face mask?
                </a>
                <ReactTooltip>{content}</ReactTooltip>
              </div>
              {/* <div className="countries-table-section">
          <CountriesTable allVaccineData={allVaccineData} />
        </div> */}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
