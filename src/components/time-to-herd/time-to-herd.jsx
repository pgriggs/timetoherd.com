import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import "./country-section.css";
import { CountriesMasterList } from "../../shared/data-factory";
import { handleCountryUpdate, calcDaysToHerd, parseVaccineData } from "./ herdHelpers";

export const TimeToHerdCount = ({
  selectedCountry,
  allVaccineData,
  requestedData,
  requestedDataAsPercent,
  herdImmunityThresholdPercentage,
}) => {
  const [herdImmunityVaccinationThreshold, setHerdImmunityVaccinationThreshold] = useState(); // multiply by 2 to account for two-shot vaccinations
  const [dailyVaccinationRate, setDailyVaccinationRate] = useState();
  const [daysToHerd, setDaysToHerd] = useState();
  const [vaccineDosesDelivered, setVaccineDosesDelivered] = useState();
  const [requestedDataValue, setRequestedDataValue] = useState();
  const [percentPopulationVaccinated, setPercentPopulationVaccinated] = useState();
  const [population, setPopulation] = useState();
  const [
    dailyVaccinationRateAsPercentPopulation,
    setDailyVaccinationRateAsPercentPopulation,
  ] = useState();
  //   const [vaccinationsListByDate, setVaccinationsListByDate] = useState();

  useEffect(() => {
    handleCountryUpdate({
      CountriesMasterList,
      countryCode: selectedCountry.iso_code,
      setPopulation,
      setHerdImmunityVaccinationThreshold,
      herdImmunityThresholdPercentage,
    });
  }, [
    selectedCountry.iso_code,
    setHerdImmunityVaccinationThreshold,
    setPopulation,
    selectedCountry,
    herdImmunityThresholdPercentage,
  ]);

  useEffect(() => {
    // Only parse after vaccination data has been retrieved
    if (allVaccineData.length > 0) {
      parseVaccineData({
        allVaccineData,
        countryCode: selectedCountry.iso_code,
        population,
        setDailyVaccinationRate,
        setDailyVaccinationRateAsPercentPopulation,
        setVaccineDosesDelivered,
        setPercentPopulationVaccinated,
      });
    }
  }, [allVaccineData, selectedCountry.iso_code, population, selectedCountry]);

  useEffect(() => {
    calcDaysToHerd({
      herdImmunityVaccinationThreshold,
      vaccineDosesDelivered,
      dailyVaccinationRate,
      setDaysToHerd,
    });
  }, [
    dailyVaccinationRate,
    herdImmunityVaccinationThreshold,
    vaccineDosesDelivered,
    selectedCountry,
  ]);

  useEffect(() => {
    switch (requestedData) {
      case "timetoherd":
        setRequestedDataValue(daysToHerd);
        break;
      case "vaccineDosesDelivered":
        setRequestedDataValue(vaccineDosesDelivered);
        break;
      case "dailyVaccinationRate":
        setRequestedDataValue(dailyVaccinationRate);
        break;
      case "herdImmunityVaccinationThreshold":
        setRequestedDataValue(herdImmunityVaccinationThreshold);
        break;
      case "percentPopulationVaccinated":
        setRequestedDataValue(percentPopulationVaccinated * 100);
        break;
      case "dailyVaccinationRateAsPercentPopulation":
        setRequestedDataValue(dailyVaccinationRateAsPercentPopulation);
        break;
      default:
        break;
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
        <CountUp className="datapoint-value" end={requestedDataValue || 0} separator="," />
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
