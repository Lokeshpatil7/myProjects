import React, { useState } from "react";
import { avengers } from "../pages/avengers";

export const AvengerDetails = () => {
  const [data, setdata] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleSearch = (e) => {
    console.log("search", e.target.value);
    console.log("avengers", avengers);
    setSearchName(e.target.value);
    // const searchData =
    //   avengers &&
    //   avengers.filter((data) => {
    //     data.avengerName.includes(e.target.value) !== -1;
    //   });

    let filterData = avengers.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    console.log("filterData", filterData);
    setdata(filterData);
  };

  return (
    // <div>Avengers List And Real Information:</div>
    <div>
      <h1 className="fury">Captain Fury</h1>
      <form className="form">
        <div class="mb-3">
          <label class="form-label">Avenger Name:</label>
          <br />
          <input
            className="input1"
            name={"name"}
            onChange={(e) => handleSearch(e)}
            class="form-control"
          />
        </div>

        {data.length &&
          searchName !== "" &&
          data.map((item) => {
            return (
              <>
                <div>Person Name :{item.personName}</div>
                <div>Abilities :{item.abilities}</div>
                <div>
                  Of Armor mission assigned :{item.ofAmrmourMissionAssigned}
                </div>
                <div>Mission Completed :{item.missionCompleted}</div>
              </>
            );
          })}
      </form>
    </div>
  );
};
