import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default () => {
  const [tutorialList, setTutorialList] = useState([]);

  const [tutorialTitle, setTutorialTitle] = useState("");
  const [tutorialDescription, setTutorialDescription] = useState("");
  const [tutorialPublished, setTutorialPublished] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editObject, setEditObject] = useState({});

  const [selectedTutorialTitle, setSelectedTutorialTitle] = useState("");

  const [tutorialObject, setTutorialObject] = useState({
    title: "",
    description: "",
    published: "",
  });
  console.log(tutorialObject);

  //get data
  const FetchData = () => {
    axios
      .get("http://localhost:3001/api/tutorials/getData")
      .then((response) => {
        console.log("responsedataaaaaaaaaaaaa", response.data);
        if (response && response.data) {
          setTutorialList(response.data);
        }
      });
  };
  useEffect(() => {}, []);
  //post
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!isEditMode) {
      axios
        .post("http://localhost:3001/api/tutorials/add", {
          ...tutorialObject,
        })
        .then((response) => {
          console.log(response);
          alert("Added");

          setTutorialObject({
            ...tutorialObject,
          });
          FetchData();
        });
    }
  };

  //delete
  const onDeleteHandler = (userId) => {
    axios
      .delete("http://localhost:8080/user/delete/" + userId)
      .then((response) => {
        console.log(response);
        alert("Deleted");
        FetchData();
      });
  };

  const onEdit = (tutorialObject) => {
    console.log(tutorialObject);
    setTutorialTitle(tutorialObject.tutorialTitle);
    setTutorialDescription(tutorialObject.tutorialDescription);
    setTutorialPublished(tutorialObject.tutorialPublished);
    setEditObject({
      ...tutorialObject,
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

  // const onUpdateRow = () => {
  //   if (userId > 0) {
  //     axios
  //       .put("http://localhost:8080/user/update/" + userId, {
  //         userId: userId,

  //         ...editObject,
  //       })
  //       .then((response) => {
  //         if (response) {
  //           FetchData();
  //           alert("updated");
  //           onResetRowHandler();
  //         }
  //       });
  //   }
  // };
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
          <label for="inputEmail3" class="col-sm-2 ">
            Published :
          </label>
          <div class="col-sm-3">
            <input
              placeholder="True/Fasle"
              type="text"
              class="form-control"
              id=""
            />
          </div>
        </div>
        <div className="col-md-5">
          <button type="submit" className="btn btn-success">
            {isEditMode ? "update" : "submit"}
          </button>
          {isEditMode && <button>Reset:</button>}
        </div>
      </form>
      <h1>Tutorials List</h1>
      <table className="table table-bordered border border-info">
        <thead>
          <tr className="table">
            <th>Title</th>
            <th>Describtion</th>
            <th>Published</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tutorialList.map((tutorial) => {
            return (
              <tr key={tutorial.tutorialTitle}>
                <td>{tutorial.tutorialTitle}</td>
                <td>
                  {selectedTutorialTitle === tutorial.tutorialTitle ? (
                    <input
                      name="tutorialTitle"
                      value={editObject.tutorialTitle}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : (
                    tutorial.tutorialTitle
                  )}
                </td>
                <td>
                  {selectedTutorialTitle === tutorial.tutorialDescription ? (
                    <input
                      name="tutorialDescription"
                      value={editObject.tutorialDescription}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : (
                    tutorial.tutorialDescription
                  )}
                </td>
                <td>
                  {selectedTutorialTitle === tutorial.tutorialPublished ? (
                    <input
                      name="tutorialPublished"
                      value={editObject.tutorialPublished}
                      onChange={onEditObjectChangeHandler}
                    />
                  ) : (
                    tutorial.tutorialPublished
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
