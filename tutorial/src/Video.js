import react from "react";
import bootstrap from "bootstrap";

export default () => {
  return (
    <>
      <h1>Video Consultant</h1>
      <form
        className="constainer"
        //   onSubmit={onFormSubmit}
      >
        <div class="row mb-3">
          <label for="" class="col-sm-2 ">
            <h2> Upload Video </h2>
          </label>
          <div class="col-sm-3">
            <input
              placeholder="video"
              type="file"
              class="form-control"
              id="video"
              name="video"
              //   value={}
              //   onChange={}
            />
          </div>
        </div>
        <div className="col-md-5">
          <button type="submit" className="btn btn-success">
            Upload
          </button>
        </div>
      </form>
    </>
  );
};
