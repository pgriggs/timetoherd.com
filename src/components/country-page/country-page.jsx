import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import {
  PieChartTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import NumericInput from "react-numeric-input";
import { TimeToHerdCountAsHTML } from "../time-to-herd/time-to-herd";
import { CountryDropdown } from "../country-dropdown/country-dropdown";
import { MapChart } from "../map-chart/map-chart";
import { CountriesTable } from "../countries-table/countries-table";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { MediaFeatures } from "../media-features/media-features";

export const CountryPage = React.memo(
  ({
    selectedCountry,
    setSelectedCountry,
    allVaccineData,
    herdImmunityThresholdPercentage,
    setHerdImmunityThresholdPercentage,
  }) => {
    const [content, setContent] = useState("");

    return (
      <>
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
            herdImmunityThresholdPercentage={herdImmunityThresholdPercentage}
          />
        </div>
      </>
    );
  }
);
