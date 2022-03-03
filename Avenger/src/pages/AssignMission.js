import React, { Component } from "react";
class AssignMission extends Component {
  state = {
    name: "",
    assignMission: "",
    selectedMissionIndex: 0,
  };

  componentDidMount() {
    let missionList = JSON.parse(localStorage.getItem("mission"));
  }

  onValueChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [event.target.name]: event.target.value });
  };
  onFormSubmitHandler = (event) => {
    // event.preventDefault();
    // console.log(this.state);
    // console.log("message sent successfully");
    event.preventDefault();

    console.log(this.state);
    console.log("message sent successfully");
    let missionList = JSON.parse(localStorage.getItem("mission"));
    console.log("message sent successfully");
    let filterMission = missionList.filter(
      (mission) => mission.assignMission === this.state.assignMission
    );
    console.log(filterMission.length);
    if (missionList !== null) {
      if (
        missionList[this.state.selectedMissionIndex].assignMission !==
          this.state.assignMission &&
        filterMission.length === 0
      ) {
        missionList[this.state.selectedMissionIndex].assignMission =
          this.state.assignMission;

        console.log(
          "Mission has been assigned. Email notification sent and/or SMS notification sent"
        );
        localStorage.setItem("mission", JSON.stringify(missionList));
        alert("Assign Mission");
      } else if (filterMission.length > 0) {
        alert(`Mission is already assigned to  ${filterMission[0].name} `);
      }
    }
  };

  selectMission = (e) => {
    console.log(e.target.value);

    this.setState({
      selectedMissionIndex: e.target.value,
      assignMission: "",
    });
  };

  render() {
    let missionList = JSON.parse(localStorage.getItem("mission"));
    console.log("this.state", this.state);
    return (
      <div>
        <form onSubmit={this.onFormSubmitHandler} className="form">
          <div class="mb-3">
            <label class="form-label">Enter Avenger Name:</label>
            <br />
            {/* <input
              className="input1"
              name={"name"}
              value={this.state.value}
              onChange={this.onValueChangeHandler}
              class="form-control"
            /> */}
            <select
              onChange={this.selectMission}
              class="form-select"
              aria-label="Default select example"
            >
              {missionList &&
                missionList.map((data, index) => {
                  return (
                    <option
                      key={index}
                      placeholder="Select Mission"
                      value={`${index}`}
                    >
                      {data.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Mission Name: </label>
            <br />

            <input
              name={"assignMission"}
              value={this.state.assignMission}
              onChange={this.onValueChangeHandler}
              class="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Assign
          </button>
        </form>
      </div>
    );
  }
}
export default AssignMission;
