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
            population having immunity to that disease.
          </span>
          <span>
            <b>Herd Immunity Threshold:</b> The percentage of a given population
            required to have immunity to an infectious disease before herd
            immunity is reached for that population.
          </span>
          <span>
            <b>Herd Immunity Threshold for Covid-19:</b> Infectious disease
            experts estimate that immunity to Covid-19 in 70-85% of a population
            would be sufficient for reaching herd immunity.
          </span>
          <span>
            <b></b>
          </span>
        </div>
        <div className="item">
          <h3>Assumptions</h3>
          <span>
            <b>Herd Immunity Threshold for Covid-19:</b> We assume immunity in a
            given 70% of the population is sufficient to reach herd immunity.
          </span>
          <span>
            <b>Vaccine Dosage:</b> We assume each vaccine is a two-dose vaccine.
          </span>
          <span>
            <b>Vaccination Dosage numbers published per country:</b> We assume
            each vaccine does administered equals one person is immune. We then
            account for the fact that each person requires two doses of the
            vaccine for immunity by multiplying a given population by 1.4.
            <br></br>
            (population x 0.70 = herd_immunity_threshold, 2 x
            herd_immunity_threshold = doses_required_for_herd_immunity)
          </span>
          <span></span>
        </div>
      </div>
    </>
  );
};
