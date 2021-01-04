import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import "./country-section.css";
import { CountriesMasterList } from "../../shared/data-factory.js";

export const TimeToHerdCount = ({ selectedCountry, allVaccineData }) => {
  //   const [
  //     herdImmunityPopulationThreshold,
  //     setHerdImmunityPopulationThreshold,
  //   ] = useState();
  const [
    herdImmunnityVaccinationThreshold,
    setherdImmunnityVaccinationThreshold,
  ] = useState(); // multipley by 2 to account for two-shot vaccinations
  const [dailyVaccinationMA3day, setDailyVaccinationMA3day] = useState();
  const [daysToHerd, setDaysToHerd] = useState();
  const [immunePopulation, setImmunePopulation] = useState();
  //   const [vaccinationsListByDate, setVaccinationsListByDate] = useState();

  useEffect(() => {
    let thisCountry = CountriesMasterList.find((country) => {
      return country.iso_code === selectedCountry.iso_code;
    });
    // setHerdImmunityPopulationThreshold(thisCountry.population * 0.7);
    setherdImmunnityVaccinationThreshold(thisCountry.population * 1.4);
  }, [selectedCountry.iso_code, setherdImmunnityVaccinationThreshold]);

  function calculateVaccinationMA(listOfDatesAndVaccinations) {
    let dataLength = listOfDatesAndVaccinations.length;
    let latestDaysNumbers = listOfDatesAndVaccinations[dataLength - 1];
    if (dataLength > 1) {
      listOfDatesAndVaccinations.forEach((item, index) => {
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
      });
    } else {
      setDailyVaccinationMA3day(latestDaysNumbers.total_vaccinations);
    }
  }

  useEffect(() => {
    const parseVaccineData = (allVaccineData) => {
      let listOfDatesAndVaccinations = [];
      if (allVaccineData.length > 0) {
        allVaccineData.forEach((row, index) => {
          if (
            row.length > 1 &&
            index > 0 &&
            row[1] === selectedCountry.iso_code
          ) {
            listOfDatesAndVaccinations.push({
              date: row[2],
              total_vaccinations: row[3],
            });
          }
        });
        let dataLength = listOfDatesAndVaccinations.length;
        setImmunePopulation(
          listOfDatesAndVaccinations[dataLength - 1].total_vaccinations
        );
        calculateVaccinationMA(listOfDatesAndVaccinations);
      }
    };
    parseVaccineData(allVaccineData);
  }, [allVaccineData, selectedCountry.iso_code]);

  const daysToHerdPlaceholder = Math.round(
    (herdImmunnityVaccinationThreshold - immunePopulation) /
      dailyVaccinationMA3day
  );

  daysToHerdPlaceholder.toLocaleString("en");
  useEffect(() => {
    setDaysToHerd(daysToHerdPlaceholder);
  }, [dailyVaccinationMA3day, daysToHerdPlaceholder]);

  return <CountUp end={daysToHerd || 0} duration={1} />;
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
