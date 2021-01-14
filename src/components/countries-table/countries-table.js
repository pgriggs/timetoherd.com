import React from "react";
import { TimeToHerdCount } from "../united-states/united-states";
import { CountriesMasterList } from "../../shared/data-factory";
import "antd/dist/antd.css";
import "./countries-table.css";

export const CountriesTable = ({ allVaccineData }) => {
  return (
    <div className="ant-table">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            <caption>Covid-19 Vaccination Progress per Country</caption>
            <thead className="ant-table-thead">
              <tr>
                <th className="ant-table-cell">Name</th>
                <th className="ant-table-cell">Time until Herd Immunity</th>
                <th className="ant-table-cell">% of Population Vaccinated</th>
                <th className="ant-table-cell"># of Vaccine Doses Given</th>
                <th className="ant-table-cell">
                  % of Population Vaccinated per Day (3-day MA)
                </th>
                <th className="ant-table-cell">
                  # of Doses Given per Day (3-day MA)
                </th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {CountriesMasterList.map((country) => (
                <tr
                  key={country.iso_code}
                  className="ant-table-row ant-table-row-level-0"
                >
                  <td className="ant-table-cell name">{country.location}</td>
                  <td className="ant-table-cell">
                    {" "}
                    <TimeToHerdCount
                      selectedCountry={{
                        name: country.location,
                        iso_code: country.iso_code,
                      }}
                      allVaccineData={allVaccineData}
                      requestedData="timetoherd"
                      requestedDataAsPercent={false}
                    />{" "}
                    days
                  </td>
                  <td className="ant-table-cell">
                    {" "}
                    <TimeToHerdCount
                      selectedCountry={{
                        name: country.location,
                        iso_code: country.iso_code,
                      }}
                      allVaccineData={allVaccineData}
                      requestedData="percentPopulationVaccinated"
                      requestedDataAsPercent
                    />
                    %
                  </td>
                  <td className="ant-table-cell">
                    {" "}
                    <TimeToHerdCount
                      selectedCountry={{
                        name: country.location,
                        iso_code: country.iso_code,
                      }}
                      allVaccineData={allVaccineData}
                      requestedData="immunepopulation"
                      requestedDataAsPercent={false}
                    />
                  </td>
                  <td>
                    {" "}
                    <TimeToHerdCount
                      selectedCountry={{
                        name: country.location,
                        iso_code: country.iso_code,
                      }}
                      allVaccineData={allVaccineData}
                      requestedData="dailyMovingAverageAsPercentPopulation"
                      requestedDataAsPercent
                    />
                    %
                  </td>
                  <td>
                    <TimeToHerdCount
                      selectedCountry={{
                        name: country.location,
                        iso_code: country.iso_code,
                      }}
                      allVaccineData={allVaccineData}
                      requestedData="dailyVaccinationMA3day"
                      requestedDataAsPercent={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
