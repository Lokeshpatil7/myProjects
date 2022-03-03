import React, { Component } from "react";
import { connect } from "react-redux";
class Mission extends Component {
  state = {
    name: "",
    assignMission: "",
    missionDetails: "",
    status: "",
  };
  onValueChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [e.target.name]: e.target.value });
  };
  onFormSubmitHandler = (event) => {
    event.preventDefault();
    let data = [this.state];
    this.state.status = "Assigned";
    console.log(
      "Mission has been assigned. Email notification sent and/or SMS notification sent"
    );
    let defaultMissions = JSON.parse(localStorage.getItem("mission"));

    // if (checkFilter && checkFilter < 3) {
    if (defaultMissions !== null) {
      // alert("if");
      const checkFilter = defaultMissions.filter(
        (data) => data.name === this.state.name
      );
      console.log("defaultMissions", checkFilter.length);
      if (checkFilter.length !== 2) {
        alert("Assign Mission");
        defaultMissions.push(this.state);
        localStorage.setItem("mission", JSON.stringify(defaultMissions));
        this.setState({
          name: "",
          assignMission: "",
          missionDetails: "",
          status: "",
        });
      } else {
        alert(
          `Sorry  ${checkFilter[0].name} has already been working on two missions`
        );
      }
    } else {
      // alert("else");
      localStorage.setItem("mission", JSON.stringify(data));
      this.setState({
        name: "",
        assignMission: "",
        missionDetails: "",
        status: "",
      });
    }
    // } else {
    //   alert(
    //     `Sorry  ${checkFilter[0].name} has already been working on two missions`
    //   );
    // }
    // console.log("localstoragedata", defaultMissions);

    // console.log(this.state);
    // console.log("message sent successfully");
    this.props.addMission(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1 className="fury">Captain Fury</h1>
        <form onSubmit={this.onFormSubmitHandler} className="form">
          <div class="mb-3">
            <label class="form-label">Avenger Name:</label>
            <br />
            <input
              className="input1"
              name={"name"}
              value={this.state.name}
              onChange={this.onValueChangeHandler}
              class="form-control"
            />
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
          <div class="mb-3">
            <label class="form-label">Mission Details: </label>

            <input
              name={"missionDetails"}
              value={this.state.missionDetails}
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
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addMission: (payload) =>
      dispatch({ type: "MISSION_ADD", payload: payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Mission);
