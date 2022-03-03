import React, { Component } from "react";
import { connect } from "react-redux";

class MissionList extends Component {
  state = {
    selectObject: null,
  };

  onValueChangeHandler = (event) => {
    const { value, name } = event.target;
    this.setState({
      selectObject: { ...this.state.selectObject, [name]: value },
    });
  };
  render() {
    let missionList = JSON.parse(localStorage.getItem("mission"));
    console.log("missionlist", missionList);
    return (
      <div>
        <table className={"table table-success table-striped"}>
          <thead>
            <tr className="tr">
              <th>Sr no</th>
              {/* <th>AvengerName</th>
              <th>Assign Mission</th>
              <th>Mission Details</th> */}
              <th>Mission Name</th>
              <th>Details</th>
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
                    <th>
                      {mission.assignMission}
                      {/* {this.state.selectObject &&
                    this.state.selectObject.id === mission.id ? ( */}
                      {/* <input
                        name="missionDetails"
                        value={this.state.selectObject.missionDetails}
                        onChange={this.onValueChangeHandler}
                      /> */}
                      {/* ) : (
                      mission.missionDetails
                    )} */}
                    </th>
                    <th>
                      {mission.missionDetails}
                      {/* {this.state.selectObject &&
                    this.state.selectObject.id === mission.id ? ( */}
                      {/* <input
                        name="missionDetails"
                        value={this.state.selectObject.missionDetails}
                        onChange={this.onValueChangeHandler}
                      /> */}
                      {/* ) : (
                      mission.missionDetails
                    )} */}
                    </th>
                    <th>
                      {mission.name}
                      {/* {this.state.selectObject &&
                    this.state.selectObject.id === mission.id ? ( */}
                      {/* <input
                        name="missionDetails"
                        value={this.state.selectObject.missionDetails}
                        onChange={this.onValueChangeHandler}
                      /> */}
                      {/* ) : (
                      mission.missionDetails
                    )} */}
                    </th>
                    {/* <th>
                    {this.state.selectObject &&
                    this.state.selectObject.id === mission.id ? (
                      <input
                        name="status"
                        value={this.state.selectObject.status}
                        onChange={this.onValueChangeHandler}
                      />
                    ) : (
                      mission.status
                    )}
                  </th>
                  <th>
                    {this.state.selectObject &&
                    this.state.selectObject.id === mission.id ? (
                      <input
                        name="name"
                        value={this.state.selectObject.name}
                        onChange={this.onValueChangeHandler}
                      />
                    ) : (
                      mission.name
                    )}
                  </th> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   //getting the value from state to props
//   return {
//     missionList: state.missionList,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateMission: (mission) =>
//       dispatch({ type: "MISSION_UPDATE", payload: mission }),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(MissionList);

export default MissionList;
