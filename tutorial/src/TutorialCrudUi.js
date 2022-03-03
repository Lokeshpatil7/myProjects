import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default () => {
  const [tutorialList, setTutorialList] = useState([]);

  const [title, setTutorialTitle] = useState("");
  const [description, setTutorialDescription] = useState("");
  const [published, setTutorialPublished] = useState("");
  const [mobileNo, setTutorialMobileNo] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutorialId, setSelectedTutorialId] = useState(-1);
  const [tutorialId, setTutorialId] = useState();
  const [tutorialObject, setTutorialObject] = useState({
    title: "",
    description: "",
    published: "",
    mobileNo: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  //===================get data=====================
  const fetchData = () => {
    axios
      .get("http://localhost:3001/api/tutorials/getData ")
      .then((response) => {
        console.log(response.data);
        if (response && response.data) {
          console.log(response.data[0].published);
          setTutorialList(response.data);
        }
      });
  };

  //============post/add=================
  const onFormSubmit = (event) => {
    console.log(tutorialObject.mobileNo.length);
    event.preventDefault();
    if (
      tutorialObject.title &&
      tutorialObject.description &&
      tutorialObject.published &&
      tutorialObject.mobileNo.length === 10
    ) {
      axios
        .post("http://localhost:3001/api/tutorials/add", {
          ...tutorialObject,
        })
        .then((response) => {
          console.log(response);
          alert("added");
          fetchData();
          setTutorialObject({
            title: "",
            description: "",
            published: "",
            mobileNo: "",
          });
        });
    } else {
      alert("please fill all the details");
    }
  };

  const onTutorialObjectChangehandler = (event) => {
    if (event) {
      const { name, value } = event.target;
      setTutorialObject({
        ...tutorialObject,
        [name]: value,
      });
    }
  };

  //=================update==================
  const onUpdateEditRow = () => {
    if (tutorialId > 0 && tutorialObject.mobileNo.length === 10) {
      axios
        .put("http://localhost:3001/api/tutorials/update/" + tutorialId, {
          id: tutorialId,
          ...tutorialObject,
        })
        .then((response) => {
          if (response) {
            fetchData();
            alert("updated");
            onResetEditRow();
          }
        });
    } else {
      alert("mobile no should be 10 digit");
    }
  };

  const onResetEditRow = () => {
    setSelectedTutorialId(-1);
    setTutorialObject({
      title: "",
      description: "",
      published: "",
      mobileNo: "",
      //  ...tutorialObject,
    });
  };

  //====================Delete===============
  const onDeleteHandler = (tutorialId) => {
    axios
      .delete("http://localhost:3001/api/tutorials/deleteData/" + tutorialId, {
        id: tutorialId,
      })
      .then((response) => {
        if (response) {
          fetchData();
          alert("Deleted");
        }
      });
  };

  const onEditObjectChangeHandler = (event) => {
    if (event) {
      const { name, value } = event.target;
      setTutorialObject({
        ...tutorialObject,
        [name]: value,
      });
    }
  };

  const onEdit = (tutorialObject) => {
    // console.log(postObject);
    setTutorialId(tutorialObject.id);
    setTutorialObject({
      title: tutorialObject.title,
      description: tutorialObject.description,
      published: tutorialObject.published,
      mobileNo: tutorialObject.mobileNo,

      //   ...tutorialObject,
    });
    setSelectedTutorialId(tutorialObject.id);
  };

  const onReset = () => {
    setIsEditMode(false);
    setTutorialTitle("");
    setTutorialDescription("");
    setTutorialPublished("");
    setTutorialMobileNo("");
  };

  const handleClickSearch = (searchTermData) => {
    if (searchTermData && searchTermData.length) {
      const searchData = tutorialList.filter((data) =>
        data && data.title ? data.title.includes(searchTermData) : data
      );
      setTutorialList(searchData);
    } else {
      // return tutorialList;
      fetchData();
    }
  };

  return (
    <>
      <h1>Tutorials Details</h1>

      <form className="constainer" onSubmit={onFormSubmit}>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 ">
            Title :
          </label>
          <div class="col-sm-3">
            <input
              placeholder="Enter the Tutorial Title"
              type="text"
              class="form-control"
              id="title"
              name="title"
              value={tutorialObject.title}
              onChange={onTutorialObjectChangehandler}
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
              id="description"
              name="description"
              value={tutorialObject.description}
              onChange={onTutorialObjectChangehandler}
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="published" class="col-sm-2 ">
            Published :
          </label>
          <div class="col-sm-3">
            <select
              style={{ width: "310px", height: "40px" }}
              name="published"
              value={tutorialObject.published}
              onChange={onTutorialObjectChangehandler}
            >
              <option selected></option>
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 ">
            MobileNo. :
          </label>
          <div class="col-sm-3">
            <input
              placeholder="Mobile Number"
              type="number"
              class="form-control"
              id="mobileNo"
              name="mobileNo"
              value={tutorialObject.mobileNo}
              onChange={onTutorialObjectChangehandler}
            />
          </div>
        </div>
        <div className="col-md-5">
          <button type="submit" className="btn btn-success">
            {isEditMode ? "update" : "submit"}
          </button>
          {isEditMode && <button onClick={onReset}>Reset:</button>}
        </div>
      </form>

      {/* table and list--------------------- */}

      <h1>Tutorials List</h1>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => {
                // setSearchTerm(event.target.value);
                handleClickSearch(event.target.value);
              }}
            />
            {/* <button
            className="btn btn-outline-success"
            onClick={handleClickSearch}
          >
            Search
          </button> */}
          </form>
        </div>
      </nav>
      <table className="table table-bordered border border-info">
        <thead>
          <tr className="table">
            <th>Id</th>
            <th>Title</th>
            <th>Describtion</th>
            <th>Published</th>
            <th>mobileNo</th>
            <th>Options</th>
          </tr>
        </thead>

        {/* tbody=========== */}

        <tbody>
          {tutorialList.map((tutorial, id, index) => {
            return (
              <tr key={tutorial.id} className="table">
                <th>{tutorial.id} </th>

                <th>
                  {selectedTutorialId === tutorial.id ? (
                    <input
                      placeholder="Enter the Tutorial Title"
                      type="text"
                      class="form-control"
                      id="title"
                      name="title"
                      value={tutorialObject.title}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : (
                    tutorial.title
                  )}
                </th>

                <th>
                  {selectedTutorialId === tutorial.id ? (
                    <input
                      placeholder="Description of tutorial"
                      type="text"
                      class="form-control"
                      id="description"
                      name="description"
                      value={tutorialObject.description}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : (
                    tutorial.description
                  )}

                  {/* {tutorial.description}  */}
                </th>

                <th>
                  {selectedTutorialId === tutorial.id ? (
                    <input
                      placeholder="true/false"
                      type="text"
                      class="form-control"
                      id="published"
                      name="published"
                      value={tutorialObject.published}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : tutorial.published ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </th>
                <th>
                  {selectedTutorialId === tutorial.id ? (
                    <input
                      placeholder="Enter your mobile Number"
                      type="number"
                      class="form-control"
                      id="mobileNo"
                      name="mobileNo"
                      value={tutorialObject.mobileNo}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : (
                    tutorial.mobileNo
                  )}
                </th>
                <td>
                  {selectedTutorialId === tutorial.id ? (
                    <>
                      <button onClick={onUpdateEditRow} class="btn btn-success">
                        Update
                      </button>

                      <button onClick={onResetEditRow} class="btn btn-primary">
                        Reset
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          onDeleteHandler(tutorial.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          onEdit(tutorial);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
