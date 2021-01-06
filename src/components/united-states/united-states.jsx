import React, { useState, useEffect, useCallback } from "react";
import CountUp from "react-countup";
import "./country-section.css";
import { CountriesMasterList } from "../../shared/data-factory.js";

export const TimeToHerdCount = ({
  selectedCountry,
  allVaccineData,
  requestedData,
  requestedDataAsPercent,
}) => {
  const [
    herdImmunnityVaccinationThreshold,
    setherdImmunnityVaccinationThreshold,
  ] = useState(); // multipley by 2 to account for two-shot vaccinations
  const [dailyVaccinationMA3day, setDailyVaccinationMA3day] = useState();
  const [daysToHerd, setDaysToHerd] = useState();
  const [vaccineDosesDelivered, setVaccineDosesDelivered] = useState();
  const [requestedDataValue, setRequestedDataValue] = useState();
  const [
    percentPopulationVaccinated,
    setPercentPopulationVaccinated,
  ] = useState();
  const [population, setPopulation] = useState();
  const [
    dailyMovingAverageAsPercentPopulation,
    setDailyMovingAverageAsPercentPopulation,
  ] = useState();
  //   const [vaccinationsListByDate, setVaccinationsListByDate] = useState();

  useEffect(() => {
    let thisCountry = CountriesMasterList.find((country) => {
      return country.iso_code === selectedCountry.iso_code;
    });
    // setHerdImmunityPopulationThreshold(thisCountry.population * 0.7);
    setPopulation(thisCountry.population);
    setherdImmunnityVaccinationThreshold(thisCountry.population * 1.4);
  }, [
    selectedCountry.iso_code,
    setherdImmunnityVaccinationThreshold,
    setPopulation,
    selectedCountry,
  ]);

  const calculateVaccinationMA = useCallback(
    (listOfDatesAndVaccinations) => {
      console.log(listOfDatesAndVaccinations);
      let dataLength = listOfDatesAndVaccinations.length;
      let latestDaysNumbers = listOfDatesAndVaccinations[dataLength - 1];
      // if (dataLength > 1) {
      //   listOfDatesAndVaccinations.forEach((item, index) => {
      //     let dateDiffInMs = Math.abs(
      //       new Date(latestDaysNumbers.date) - new Date(item.date)
      //     );
      //     let dateDiffInDays = Math.floor(dateDiffInMs / (1000 * 3600 * 24));
      //     console.log(dateDiffInDays);
      //     if (
      //       (dateDiffInDays === 3 && item.total_vaccinations > 0) ||
      //       (dateDiffInDays === 4 && item.total_vaccinations > 0)
      //     ) {
      //       let movingAverage =
      //         (latestDaysNumbers.total_vaccinations - item.total_vaccinations) /
      //         dateDiffInDays;
      //       setDailyVaccinationMA3day(movingAverage);
      //       setDailyMovingAverageAsPercentPopulation(
      //         (movingAverage / population) * 100
      //       );
      //     }
      //   });
      if (dataLength > 1) {
        let dateDiffInMs = Math.abs(
          new Date(latestDaysNumbers.date) -
            new Date(listOfDatesAndVaccinations[0].date)
        );
        let dateDiffInDays = Math.floor(dateDiffInMs / (1000 * 3600 * 24));
        console.log(dateDiffInDays);
        let movingAverage =
          (latestDaysNumbers.total_vaccinations -
            listOfDatesAndVaccinations[0].total_vaccinations) /
          dateDiffInDays;
        setDailyVaccinationMA3day(movingAverage);
        setDailyMovingAverageAsPercentPopulation(
          (movingAverage / population) * 100
        );
      } else {
        setDailyVaccinationMA3day(latestDaysNumbers.total_vaccinations);
        setDailyMovingAverageAsPercentPopulation(
          (latestDaysNumbers.total_vaccinations / population) * 100
        );
      }
    },
    [
      population,
      setDailyVaccinationMA3day,
      setDailyMovingAverageAsPercentPopulation,
    ]
  );

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
              total_vaccinations: Number(row[3]),
            });
          }
        });
        let dataLength = listOfDatesAndVaccinations.length;
        setVaccineDosesDelivered(
          listOfDatesAndVaccinations[dataLength - 1].total_vaccinations
        );
        calculateVaccinationMA(listOfDatesAndVaccinations);
        setPercentPopulationVaccinated(
          listOfDatesAndVaccinations[dataLength - 1].total_vaccinations /
            (population * 2)
        );
      }
    };
    parseVaccineData(allVaccineData);
  }, [
    allVaccineData,
    selectedCountry.iso_code,
    calculateVaccinationMA,
    population,
    selectedCountry,
  ]);

  const calcDaysToHerd = (
    herdImmunnityVaccinationThreshold,
    vaccineDosesDelivered,
    dailyVaccinationMA3day
  ) => {
    console.log("threshold " + herdImmunnityVaccinationThreshold);
    let daysRounded = Math.round(
      (herdImmunnityVaccinationThreshold - vaccineDosesDelivered) /
        dailyVaccinationMA3day
    );
    console.log(
      "numerator " + (herdImmunnityVaccinationThreshold - vaccineDosesDelivered)
    );
    console.log("denominator " + dailyVaccinationMA3day);
    return daysRounded;
  };

  useEffect(() => {
    let daysToHerdPlaceholder = calcDaysToHerd(
      herdImmunnityVaccinationThreshold,
      vaccineDosesDelivered,
      dailyVaccinationMA3day
    );
    setDaysToHerd(daysToHerdPlaceholder);
  }, [
    dailyVaccinationMA3day,
    herdImmunnityVaccinationThreshold,
    vaccineDosesDelivered,
    selectedCountry,
  ]);

  useEffect(() => {
    if (requestedData === "timetoherd") {
      setRequestedDataValue(daysToHerd);
    }
    if (requestedData === "vaccineDosesDelivered") {
      setRequestedDataValue(vaccineDosesDelivered);
    }
    if (requestedData === "dailyVaccinationMA3day") {
      setRequestedDataValue(dailyVaccinationMA3day);
    }
    if (requestedData === "herdImmunnityVaccinationThreshold") {
      setRequestedDataValue(herdImmunnityVaccinationThreshold);
    }
    if (requestedData === "percentPopulationVaccinated") {
      setRequestedDataValue(percentPopulationVaccinated * 100);
    }
    if (requestedData === "dailyMovingAverageAsPercentPopulation") {
      setRequestedDataValue(dailyMovingAverageAsPercentPopulation);
    }
  }, [
    setRequestedDataValue,
    requestedData,
    vaccineDosesDelivered,
    daysToHerd,
    dailyVaccinationMA3day,
    herdImmunnityVaccinationThreshold,
    dailyMovingAverageAsPercentPopulation,
    percentPopulationVaccinated,
    selectedCountry,
  ]);

  return (
    <>
      {requestedDataAsPercent ? (
        <CountUp end={requestedDataValue || 0} duration={1} decimals={3} />
      ) : (
        <CountUp
          className="datapoint-value"
          end={requestedDataValue || 0}
          separator=","
        />
      )}
    </>
  );
};

// <span>Vaccinations given: {vaccineDosesDelivered}</span>
// <br></br>
// <span>Herd Populations Threshold: {herdImmunityPopulationThreshold}</span>
// <br></br>
// <span>
//   Herd Vacccination Threshold: {herdImmunnityVaccinationThreshold}
// </span>
// <br></br>
// <span>Vacccination 3-day average: {dailyVaccinationMA3day}</span>
// <br></br>
