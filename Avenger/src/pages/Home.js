import React from "react";

const handlieClear = () => {
  localStorage.removeItem("mission");
  window.location.reload();
};
function Home() {
  let missionList = JSON.parse(localStorage.getItem("mission"));

  return (
    <>
      <div className="home">
        {missionList !== null && missionList.length ? (
          <table className={"table table-success table-striped"}>
            <thead>
              <tr className="tr">
                <th>Sr no</th>
                <th>Mission Name</th>
                <th>Status</th>
                <th>Avengers</th>
              </tr>
            </thead>
            <tbody>
              {missionList !== null &&
                missionList.length &&
                missionList.map((mission, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>{mission.assignMission}</th>
                      <th>{mission.status}</th>
                      <th>{mission.name}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>
            No Mission Assign to Avengers
          </h1>
        )}
      </div>
      <button onClick={handlieClear}>Clear</button>
    </>
  );
}

export default Home;
