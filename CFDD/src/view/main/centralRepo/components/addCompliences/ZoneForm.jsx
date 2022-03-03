import React from "react";
import { Select } from "antd";
const { Option } = Select;

function ZoneForm({ region, setregion, zone, setzone, country, setCountry }) {
  console.log("zone", region);
  const zoneData = {
    Asia: {
      countries: {
        India: {
          zones: [
            "North Zone",
            "South Zone",
            "East Zone",
            "West Zone",
            "Central Zone",
            "North East Zone",
            "All",
          ],
        },
      },
    },
    // "Africa": {
    //   "countries": {}
    // },
    // "North America": {
    //   "countries": {}
    // },
    // "South America": {
    //   "countries": {}
    // },
    // "Antarctica": {
    //   "countries": {}
    // },
    // "Europe": {
    //   "countries": {}
    // },
    // "Australia/Oceania": {
    //   "countries": {}
    // }
  };

  return (
    <div>
      <div>
        <label className="label"> region </label> <br />
        <Select
          value={region}
          onChange={(value) => {
            setregion(value);
          }}
        >
          {Object.keys(zoneData).map((reg) => (
            <Option value={reg}>{reg}</Option>
          ))}
        </Select>
      </div>
      <br />
      <div>
        <label className="label"> Country </label> <br />
        <Select
          value={country}
          onChange={(value) => {
            setCountry(value);
          }}
        >
          {region
            ? Object.keys(zoneData[region].countries).map((reg) => (
                <Option value={reg}>{reg}</Option>
              ))
            : ""}
        </Select>
      </div>
      <br />
      <div>
        <label className="label"> Zone </label> <br />
        <Select
          value={zone}
          onChange={(value) => {
            setzone(value);
          }}
        >
          {zoneData[region].countries[country].zones.map((reg) => (
            <Option value={reg}>{reg}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default ZoneForm;
