import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./country-dropdown.css";
import { CountriesMasterList } from "../../shared/data-factory";

export const CountryDropdown = ({ selectedCountry, setSelectedCountry }) => {
  const [menuIsVisble, setMenuIsVisible] = useState(false);
  const selectCountryHandler = (country) => {
    setSelectedCountry({
      name: country.location,
      iso_code: country.iso_code,
    });
    setMenuIsVisible(false);
  };

  const dropdownVisibleChangeHandler = (visible) => {
    setMenuIsVisible(visible);
  };

  const menu = (
    <Menu>
      {CountriesMasterList.map((country, index) => (
        <Menu.Item
          key={country.iso_code}
          style={
            selectedCountry.iso_code === country.iso_code
              ? { background: "#2E9BFF", color: "#fff" }
              : {}
          }
          onClick={() => selectCountryHandler(country)}
        >
          <span>{country.location}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown
      overlayClassName="country-dropdown"
      overlay={menu}
      placement="bottomRight"
      trigger={["click"]}
      onVisibleChange={(visible) => dropdownVisibleChangeHandler(visible)}
      arrow
    >
      <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {selectedCountry.name}
        <DownOutlined
          style={
            menuIsVisble
              ? {
                  fontSize: "2vmin",
                  marginLeft: "4px",
                  transform: "rotate( -180deg )",
                  transition: "transform 150ms ease-in-out",
                }
              : {
                  fontSize: "2vmin",
                  marginLeft: "4px",
                  transform: "rotate( -360deg )",
                  transition: "transform 150ms ease-in-out",
                }
          }
        />
      </span>
    </Dropdown>
  );
};
