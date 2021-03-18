export const handleCountryUpdate = ({
  CountriesMasterList,
  countryCode,
  setPopulation,
  setHerdImmunityVaccinationThreshold,
  herdImmunityThresholdPercentage,
}) => {
  const thisCountry = CountriesMasterList.find((country) => {
    return country.iso_code === countryCode;
  });
  // setHerdImmunityPopulationThreshold(thisCountry.population * 0.7);
  setPopulation(thisCountry.population);
  setHerdImmunityVaccinationThreshold(
    thisCountry.population * 2 * (herdImmunityThresholdPercentage / 100)
  );
};

export const calcDaysToHerd = ({
  herdImmunityVaccinationThreshold,
  vaccineDosesDelivered,
  dailyVaccinationRate,
  setDaysToHerd,
}) => {
  const daysRounded = Math.round(
    (herdImmunityVaccinationThreshold - vaccineDosesDelivered) /
      dailyVaccinationRate
  );
  setDaysToHerd(daysRounded);
};

export const parseVaccineData = ({
  allVaccineData,
  countryCode,
  population,
  setDailyVaccinationRate,
  setDailyVaccinationRateAsPercentPopulation,
  setVaccineDosesDelivered,
  setPercentPopulationVaccinated,
}) => {
  // Source data heading locations dynamically as the source add columns from time to time
  const dataHeadings = allVaccineData[0];
  const isoCodeIdx = dataHeadings.findIndex(
    (heading) => heading === "iso_code"
  );
  const dailyVaccinationsIdx = dataHeadings.findIndex(
    (heading) => heading === "daily_vaccinations"
  );
  const totalVaccinationsIdx = dataHeadings.findIndex(
    (heading) => heading === "total_vaccinations"
  );

  // Get most recent data from selected country
  const countryData = allVaccineData.filter(
    (data) => data[isoCodeIdx] === countryCode
  );

  const mostRecentCountryData = countryData[countryData.length - 1];

  // Get most recent fields for calculations
  // Set values for display
  let dailyRate = mostRecentCountryData[dailyVaccinationsIdx] ?? 0;

  if (countryData.length === 1) {
    dailyRate = mostRecentCountryData[totalVaccinationsIdx];
  }

  const totalVaccinations = mostRecentCountryData[totalVaccinationsIdx];

  // Set values for display
  setDailyVaccinationRate(dailyRate);
  setDailyVaccinationRateAsPercentPopulation((dailyRate / population) * 100);
  setVaccineDosesDelivered(totalVaccinations);
  setPercentPopulationVaccinated(totalVaccinations / (population * 2));
};
