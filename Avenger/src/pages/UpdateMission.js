import React, { Component } from "react";
// import { Form } from "bootstrap"

class UpdateMission extends Component {
  state = {
    name: "",
    missionStatus: "",
    selectedMissionIndex: 0,
  };

  componentDidMount() {
    let missionList = JSON.parse(localStorage.getItem("mission"));
    if (missionList !== null) {
      this.setState({
        missionStatus: missionList[0].status,
      });
    }
  }

  onValueChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFormSubmitHandler = (event) => {
    event.preventDefault();
    alert("Submit");
    console.log(this.state);
    console.log("message sent successfully");
    let missionList = JSON.parse(localStorage.getItem("mission"));
    if (missionList !== null) {
      missionList[this.state.selectedMissionIndex].status =
        this.state.missionStatus;
      localStorage.setItem("mission", JSON.stringify(missionList));
    }
  };

  selectMission = (e) => {
    console.log(e.target.value);

    let missionList = JSON.parse(localStorage.getItem("mission"));
    if (missionList !== null) {
      this.setState({
        missionStatus: missionList[e.target.value].status,
        selectedMissionIndex: e.target.value,
      });
    }
  };

  selectStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let missionList = JSON.parse(localStorage.getItem("mission"));

    console.log("this.state", this.state);
    return (
      <div>
        <form onSubmit={this.onFormSubmitHandler} className="form">
          <div class="mb-3">
            <label class="form-label">Enter Mission Name:</label>
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
                      {data.assignMission}
                    </option>
                  );
                })}
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Enter New Status </label>
            <br />

            <input
              name={"missionStatus"}
              value={this.state.missionStatus}
              onChange={this.onValueChangeHandler}
              class="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateMission;
