import { Link } from "react-router-dom";
export default () => {
  let missionList = JSON.parse(localStorage.getItem("mission"));

  return (
    <div>
      {missionList !== null && missionList.length ? (
        <table className={"table table-success table-striped"}>
          <thead>
            <tr className="tr">
              <th>Sr no</th>
              <th>Avenger Name</th>
              <th>Status</th>
              <th>Mission Name</th>
            </tr>
          </thead>
          <tbody>
            {missionList !== null &&
              missionList.length &&
              missionList.map((mission, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{mission.name}</th>
                    <th>{mission.status}</th>
                    <th>{mission.assignMission}</th>
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
  );
};
