import React from "react";
import { Table } from "antd";
import { TimeToHerdCountAsNum } from "../time-to-herd/time-to-herd";
import { CountriesMasterList } from "../../shared/data-factory";
import "./countries-table.css";

export const CountriesTable = ({
  allVaccineData,
  herdImmunityThresholdPercentage,
}) => {
  const tableColumns = [
    {
      title: "Country",
      dataIndex: "location",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title:
        "Days until population is " +
        herdImmunityThresholdPercentage +
        "% vaccinated",
      dataIndex: "timetoherd",
      defaultSortOrder: "ascend",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.timetoherd - b.timetoherd,
    },
    {
      title: "Percent of population vaccinated",
      dataIndex: "percentVaccinated",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.percentVaccinated - b.percentVaccinated,
    },
    {
      title: "Percent of population vaccinated daily",
      dataIndex: "percentVaccinatedDaily",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.percentVaccinatedDaily - b.percentVaccinatedDaily,
    },
  ];

  const tableData = [];
  CountriesMasterList.map((country, index) => {
    const selectedCountry = {
      name: country.location,
      iso_code: country.iso_code,
    };

    const countryObjectForTableData = {
      key: index,
      location: country.location,
      timetoherd: TimeToHerdCountAsNum({
        selectedCountry: selectedCountry,
        allVaccineData: allVaccineData,
        requestedData: "timetoherd",
        requestedDataAsPercent: false,
        herdImmunityThresholdPercentage: herdImmunityThresholdPercentage,
      }),
      percentVaccinated: TimeToHerdCountAsNum({
        selectedCountry: selectedCountry,
        allVaccineData: allVaccineData,
        requestedData: "percentPopulationVaccinated",
        requestedDataAsPercent: true,
        herdImmunityThresholdPercentage: herdImmunityThresholdPercentage,
      }),
      percentVaccinatedDaily: TimeToHerdCountAsNum({
        selectedCountry: selectedCountry,
        allVaccineData: allVaccineData,
        requestedData: "dailyVaccinationRateAsPercentPopulation",
        requestedDataAsPercent: true,
        herdImmunityThresholdPercentage: herdImmunityThresholdPercentage,
      }),
    };

    tableData.push(countryObjectForTableData);
  });

  return (
    <div className="countries-table-section">
      <h2 className="countries-table-section-header">
        COVID-19 Vaccinations per Country
      </h2>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        // scroll={{ y: 500 }}
      />
    </div>
  );
};

//   return (
//     <div className="ant-table">
//       <div className="ant-table-container">
//         <div className="ant-table-content">
//           <table>
//             <caption>Covid-19 Vaccination Progress per Country</caption>
//             <thead className="ant-table-thead">
//               <tr>
//                 <th className="ant-table-cell">Name</th>
//                 <th className="ant-table-cell">Time until Herd Immunity</th>
//                 <th className="ant-table-cell">% of Population Vaccinated</th>
//                 <th className="ant-table-cell"># of Vaccine Doses Given</th>
//                 <th className="ant-table-cell">
//                   % of Population Vaccinated per Day (3-day MA)
//                 </th>
//                 <th className="ant-table-cell">
//                   # of Doses Given per Day (3-day MA)
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="ant-table-tbody">
//               {CountriesMasterList.map((country) => (
//                 <tr
//                   key={country.iso_code}
//                   className="ant-table-row ant-table-row-level-0"
//                 >
//                   <td className="ant-table-cell name">{country.location}</td>
//                   <td className="ant-table-cell">
//                     {" "}
//                     <TimeToHerdCount
//                       selectedCountry={{
//                         name: country.location,
//                         iso_code: country.iso_code,
//                       }}
//                       allVaccineData={allVaccineData}
//                       requestedData="timetoherd"
//                       requestedDataAsPercent={false}
//                     />{" "}
//                     days
//                   </td>
//                   <td className="ant-table-cell">
//                     {" "}
//                     <TimeToHerdCount
//                       selectedCountry={{
//                         name: country.location,
//                         iso_code: country.iso_code,
//                       }}
//                       allVaccineData={allVaccineData}
//                       requestedData="percentPopulationVaccinated"
//                       requestedDataAsPercent
//                     />
//                     %
//                   </td>
//                   <td className="ant-table-cell">
//                     {" "}
//                     <TimeToHerdCount
//                       selectedCountry={{
//                         name: country.location,
//                         iso_code: country.iso_code,
//                       }}
//                       allVaccineData={allVaccineData}
//                       requestedData="immunepopulation"
//                       requestedDataAsPercent={false}
//                     />
//                   </td>
//                   <td>
//                     {" "}
//                     <TimeToHerdCount
//                       selectedCountry={{
//                         name: country.location,
//                         iso_code: country.iso_code,
//                       }}
//                       allVaccineData={allVaccineData}
//                       requestedData="dailyMovingAverageAsPercentPopulation"
//                       requestedDataAsPercent
//                     />
//                     %
//                   </td>
//                   <td>
//                     <TimeToHerdCount
//                       selectedCountry={{
//                         name: country.location,
//                         iso_code: country.iso_code,
//                       }}
//                       allVaccineData={allVaccineData}
//                       requestedData="dailyVaccinationMA3day"
//                       requestedDataAsPercent={false}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
