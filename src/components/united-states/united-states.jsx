import React, { useState, useEffect } from "react";

import { readRemoteFile } from "react-papaparse";
import CountUp from "react-countup";
import "./country-section.css";

export const UnitedStates = () => {
  const population = 328200000;
  const herdImmunityPopulationThreshold = population * 0.7;
  const herdImmunnityVaccinationThreshold = herdImmunityPopulationThreshold * 2; // multipley by 2 to account for two-shot vaccinations
  const [dailyVaccinationMA3day, setDailyVaccinationMA3day] = useState();
  const [daysToHerd, setDaysToHerd] = useState();
  const [immunePopulation, setImmunePopulation] = useState();
  const [vaccinationsListByDate, setVaccinationsListByDate] = useState();

  function calculateVaccinationMA(listOfDatesAndVaccinations) {
    let dataLength = listOfDatesAndVaccinations.length;
    let latestDaysNumbers = listOfDatesAndVaccinations[dataLength - 1];
    listOfDatesAndVaccinations.map((item, index) => {
      let dateDiffInMs = Math.abs(
        new Date(latestDaysNumbers.date) - new Date(item.date)
      );
      let dateDiffInDays = Math.floor(dateDiffInMs / (1000 * 3600 * 24));
      if (dateDiffInDays === 3 || dateDiffInDays === 4) {
        let movingAverage =
          (latestDaysNumbers.total_vaccinations - item.total_vaccinations) /
          dateDiffInDays;
        setDailyVaccinationMA3day(movingAverage);
      }
      return;
    });
  }

  const setterOfSetters = (rawVaccineData) => {
    let listOfDatesAndVaccinations = [];
    rawVaccineData.map((row, index) => {
      if (row.length > 1 && index > 0) {
        listOfDatesAndVaccinations.push({
          date: row[1],
          total_vaccinations: row[3],
        });
      }
      return;
    });
    let dataLength = listOfDatesAndVaccinations.length;
    setVaccinationsListByDate(listOfDatesAndVaccinations);
    setImmunePopulation(
      listOfDatesAndVaccinations[dataLength - 1].total_vaccinations
    );
    calculateVaccinationMA(listOfDatesAndVaccinations);
  };

  const get_us_vaccine_data = () => {
    readRemoteFile(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/United%20States.csv",
      {
        complete: (results) => {
          console.log("Results:", results);
          setterOfSetters(results.data);
          console.log(vaccinationsListByDate);
        },
      }
    );
  };

  useEffect(() => {
    get_us_vaccine_data();
  }, [get_us_vaccine_data]);

  const daysToHerdPlaceholder = Math.round(
    (herdImmunnityVaccinationThreshold - immunePopulation) /
      dailyVaccinationMA3day
  );

  daysToHerdPlaceholder.toLocaleString("en");
  useEffect(() => {
    setDaysToHerd(daysToHerdPlaceholder);
  }, [dailyVaccinationMA3day, daysToHerdPlaceholder]);

  return (
    <div className="country-section">
      <div class="hero-container">
        <span className="time-to-heard-number">
          <CountUp end={daysToHerd || 0} duration={1} />
        </span>
        <span className="time-to-heard-unit">&nbsp;days</span>
      </div>
      <p>until herd immunity to Covid-19 is reached in the United States</p>
      <br></br>
    </div>
  );
};

// <span>Vaccinations given: {immunePopulation}</span>
// <br></br>
// <span>Herd Populations Threshold: {herdImmunityPopulationThreshold}</span>
// <br></br>
// <span>
//   Herd Vacccination Threshold: {herdImmunnityVaccinationThreshold}
// </span>
// <br></br>
// <span>Vacccination 3-day average: {dailyVaccinationMA3day}</span>
// <br></br>
