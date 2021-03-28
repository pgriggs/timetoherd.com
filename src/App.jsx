import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import "./App.css";
import { CountriesMasterList } from "./shared/data-factory";

import { readRemoteFile } from "react-papaparse";
import { ToastContainer, Slide } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { Methodology } from "./components/methodology/methodology";
import { Supporters } from "./components/supporters/supporters";
import { SocialSharingButton } from "./components/social-sharing/social-sharing-button";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { Homepage } from "./components/homepage/homepage";
import { CountryPage } from "./components/country-page/country-page";

// import { CountriesTable } from "./components/countries-table/countries-table.js";
// import { CountriesMasterList } from "./shared/data-factory.js";

document.body.addEventListener(
  "wheel",
  (e) => {
    if (e.path && e.path.includes(document.getElementById("the-country-map"))) {
      e.preventDefault();
    }
  },
  { passive: false }
);

export default function App() {
  const history = useHistory();

  const countryByUrlParam = window.location.pathname.replace("/country/", "");

  let initialCountry = CountriesMasterList.find((country) => {
    return country.iso_code === countryByUrlParam;
  });

  initialCountry = initialCountry || {
    name: "United States",
    iso_code: "USA",
  };

  const [allVaccineData, setAllVaccineData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  const setSelectedCountryWithUrlChange = (country) => {
    setSelectedCountry(country);
    if (country.iso_code === "USA" && history) {
      history.push("/");
    }
    if (country.iso_code !== "USA" && history) {
      history.push("/country/" + country.iso_code);
    }
  };

  const [
    herdImmunityThresholdPercentage,
    setHerdImmunityThresholdPercentage,
  ] = useState(70);

  const get_all_vaccine_data = useCallback(() => {
    readRemoteFile(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv",
      {
        complete: (results) => {
          return setAllVaccineData(results.data);
        },
      }
    );
  }, [setAllVaccineData]);

  useEffect(() => {
    get_all_vaccine_data();
  }, [get_all_vaccine_data]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
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
          <Homepage
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountryWithUrlChange}
            allVaccineData={allVaccineData}
            herdImmunityThresholdPercentage={herdImmunityThresholdPercentage}
            setHerdImmunityThresholdPercentage={
              setHerdImmunityThresholdPercentage
            }
          />
        </Route>
        <Route exact path="/country/:countryParam">
          <header>
            <nav>
              <Link to="/supporters">Supporters</Link>
              <Link to="/methodology">Methodology</Link>
              <SocialSharingButton />
            </nav>
          </header>
          <CountryPage
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountryWithUrlChange}
            allVaccineData={allVaccineData}
            herdImmunityThresholdPercentage={herdImmunityThresholdPercentage}
            setHerdImmunityThresholdPercentage={
              setHerdImmunityThresholdPercentage
            }
          />
        </Route>
      </Switch>
    </div>
  );
}
