import React from "react";
export default () => {
  return (
    <>
      <div>
        <form className="constainer">
          <div class="row mb-3">
            <label for="title" class="col-sm-2 ">
              Title :
            </label>
            <div class="col-sm-3">
              <input
                placeholder="Enter the Tutorial Title"
                type="text"
                class="form-control"
                id=""
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 ">
              Describtion :
            </label>
            <div class="col-sm-3">
              <input
                placeholder="Describtion of Tutorial"
                type="text"
                class="form-control"
                id=""
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="published" class="col-sm-2 ">
              Published :
            </label>
            <div class="col-sm-3">
              <select style={{ width: "310px", height: "40px" }}>
                <option selected></option>
                <option>YES</option>
                <option>NO</option>
              </select>
            </div>
          </div>
          <div className="col-md-5">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
