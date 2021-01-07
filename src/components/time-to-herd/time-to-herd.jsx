import React, { useState, useEffect } from "react";
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
    herdImmunityVaccinationThreshold,
    setHerdImmunityVaccinationThreshold,
  ] = useState(); // multiply by 2 to account for two-shot vaccinations
  const [dailyVaccinationRate, setDailyVaccinationRate] = useState();
  const [daysToHerd, setDaysToHerd] = useState();
  const [vaccineDosesDelivered, setVaccineDosesDelivered] = useState();
  const [requestedDataValue, setRequestedDataValue] = useState();
  const [
    percentPopulationVaccinated,
    setPercentPopulationVaccinated,
  ] = useState();
  const [population, setPopulation] = useState();
  const [
    dailyVaccinationRateAsPercentPopulation,
    setDailyVaccinationRateAsPercentPopulation,
  ] = useState();
  //   const [vaccinationsListByDate, setVaccinationsListByDate] = useState();

  useEffect(() => {
    let thisCountry = CountriesMasterList.find((country) => {
      return country.iso_code === selectedCountry.iso_code;
    });
    // setHerdImmunityPopulationThreshold(thisCountry.population * 0.7);
    setPopulation(thisCountry.population);
    setHerdImmunityVaccinationThreshold(thisCountry.population * 1.4);
  }, [
    selectedCountry.iso_code,
    setHerdImmunityVaccinationThreshold,
    setPopulation,
    selectedCountry,
  ]);

  useEffect(() => {
    const parseVaccineData = (allVaccineData) => {
      // Source data heading locations dynamically as the source add columns from time to time
      const dataHeadings = allVaccineData[0];
      const isoCodeIdx = dataHeadings.findIndex(heading => heading === "iso_code");
      const dailyVaccinationsIdx = dataHeadings.findIndex(heading => heading === "daily_vaccinations");
      const totalVaccinationsIdx = dataHeadings.findIndex(heading => heading === "total_vaccinations");

      // Get most recent data from selected country
      const countryData = allVaccineData.filter(data => data[isoCodeIdx] === selectedCountry.iso_code);
      const mostRecentCountryData = countryData[countryData.length - 1];

      // Get most recent fields for calculations
      const dailyRate = mostRecentCountryData[dailyVaccinationsIdx] ?? 0;
      const totalVaccinations = mostRecentCountryData[totalVaccinationsIdx];

      // Set values for display
      setDailyVaccinationRate(dailyRate);
      setDailyVaccinationRateAsPercentPopulation((dailyRate / population) * 100);
      setVaccineDosesDelivered(totalVaccinations);
      setPercentPopulationVaccinated(totalVaccinations / (population * 2));
    };

    // Only parse after vaccination data has been retrieved
    if(allVaccineData.length > 0) {
      parseVaccineData(allVaccineData);
    }
  }, [
    allVaccineData,
    selectedCountry.iso_code,
    population,
    selectedCountry,
  ]);

  const calcDaysToHerd = (
    herdImmunnityVaccinationThreshold,
    vaccineDosesDelivered,
    dailyVaccinationRate
  ) => {
    console.log("threshold " + herdImmunnityVaccinationThreshold);
    let daysRounded = Math.round(
      (herdImmunnityVaccinationThreshold - vaccineDosesDelivered) /
        dailyVaccinationRate
    );
    console.log(
      "numerator " + (herdImmunnityVaccinationThreshold - vaccineDosesDelivered)
    );
    console.log("denominator " + dailyVaccinationRate);
    return daysRounded;
  };

  useEffect(() => {
    let daysToHerdPlaceholder = calcDaysToHerd(
      herdImmunityVaccinationThreshold,
      vaccineDosesDelivered,
      dailyVaccinationRate
    );
    setDaysToHerd(daysToHerdPlaceholder);
  }, [
    dailyVaccinationRate,
    herdImmunityVaccinationThreshold,
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
    if (requestedData === "dailyVaccinationRate") {
      setRequestedDataValue(dailyVaccinationRate);
    }
    if (requestedData === "herdImmunityVaccinationThreshold") {
      setRequestedDataValue(herdImmunityVaccinationThreshold);
    }
    if (requestedData === "percentPopulationVaccinated") {
      setRequestedDataValue(percentPopulationVaccinated * 100);
    }
    if (requestedData === "dailyVaccinationRateAsPercentPopulation") {
      setRequestedDataValue(dailyVaccinationRateAsPercentPopulation);
    }
  }, [
    setRequestedDataValue,
    requestedData,
    vaccineDosesDelivered,
    daysToHerd,
    dailyVaccinationRate,
    herdImmunityVaccinationThreshold,
    dailyVaccinationRateAsPercentPopulation,
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
