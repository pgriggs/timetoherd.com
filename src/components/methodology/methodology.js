import React from "react";
import "./methodology.css";

export const Methodology = () => {
  return (
    <>
      <h1>Methodology</h1>
      <div className="methodology-container">
        <div className="item">
          <h3>Definitions</h3>
          <span>
            <b>Herd Immunity:</b> A population's protection from the spread of
            an infectius disease caused by a sufficient percentage of the
            population having immunity to that disease.{" "}
            <a
              target="_blank"
              href="https://en.wikipedia.org/wiki/Herd_immunity"
            >
              Learn more
            </a>
          </span>
          <span>
            <b>Herd Immunity Threshold: </b>The percentage of a given population
            required to have immunity to an infectious disease before herd
            immunity is reached for that population.
          </span>
          <span>
            <b>Herd Immunity Threshold for Covid-19: </b>Infectious disease
            experts estimate that immunity to Covid-19 in 70-85% of a population
            would be sufficient for reaching herd immunity.
          </span>
          <span>
            <b>Percentage of population receiving the vaccine daily: </b>
            Average Doses Administered Daily as a Percentage of Population =
            (7-Day Moving Average of Daily Doses Delivered / Population) * 100
          </span>
          <span>
            <b>Percentage of Population Vaccinated: </b>
            Percent Vaccinated = (Total Vaccine Doses Administered * 0.5) /
            Population
          </span>
          <span>
            <b>Days to Herd Immunity: </b>
            Days = [(Population * 0.7) - (Vaccine Doses Delivered * 0.5)] /
            (Average Daily Vaccine Doses Given * 0.5)
          </span>
        </div>
        <div className="item">
          <h3>Assumptions</h3>
          <span>
            <b>Herd Immunity Threshold for Covid-19:</b> We assume immunity in a
            given 70% of the population is sufficient to reach herd immunity.{" "}
            <a
              target="_blank"
              href="https://www.nytimes.com/2020/12/24/health/herd-immunity-covid-coronavirus.html"
            >
              Learn more
            </a>
          </span>
          <span>
            <b>Vaccine Dosage:</b> We assume each vaccine is a two-dose vaccine.
          </span>
          <span>
            <b>Vaccination Dosage numbers published per country:</b> We assume
            each vaccine dose administered equals one person is immune. We then
            account for the fact that each person requires two doses of the
            vaccine for immunity by multiplying the total doses delivered to
            date by 0.5.
          </span>
          <span>
            <b>Immunity from Covid-19 Infection:</b> We do not include confirmed
            Covid-19 cases in our project of time to herd immunity because it is
            unknown if Covid-19 infection gives immunity, and if yes, how
            frequently infection results in immunity.
          </span>
        </div>
        <div className="item">
          <h3>Open Datasets</h3>
          <span>
            <b>Vaccine Data per Country: </b>
            <a
              target="_blank"
              href="https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations"
            >
              https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations
            </a>
          </span>
        </div>
        <div className="item">
          <h3>Project Code</h3>
          <span>
            <b>Github repo for timetoherd.com: </b>
            <a target="_blank" href="https://github.com/pgriggs/timetoherd.com">
              https://github.com/pgriggs/timetoherd.com
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
