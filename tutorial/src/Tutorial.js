// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";

// export default () => {
//   const [tutorialList, setTutorialList] = useState([]);

//   const [tutorialTitle, setTutorialTitle] = useState("");
//   const [tutorialDescription, setTutorialDescription] = useState("");
//   const [tutorialPublished, setTutorialPublished] = useState(false);

//   const [isEditMode, setEditMode] = useState(false);

//   const [userId, setUserId] = useState(0);
//   const [selectedUserId, setSelectedUserId] = useState(-1);
//   const [editObject, setEditObject] = useState({});

//   const [tutorialObject, setTutorialObject] = useState({
//     title: "",
//     description: "",
//     published: "",
//   });

//   const FetchData = () => {
//     axios
//       .get("http://localhost:3001/api/tutorials/getData")
//       .then((response) => {
//         console.log(response.data);
//         if (response && response.data) {
//           setTutorialList(response.data);
//         }
//       });
//   };

//   useEffect(() => {}, []);

//   const onFormSubmit = (event) => {
//     event.preventDefault();
//     if (!isEditMode) {
//       axios
//         .post("http://localhost:3001/api/tutorials/add", {
//           ...tutorialObject,
//         })
//         .then((response) => {
//           console.log(response);
//           alert("Added");

//           setTutorialObject({
//             title: "",
//             description: "",
//             published: "",
//           });
//           FetchData();
//         });
//     }
//   };

//   // const onDeleteHandler = (userId) => {
//   //   axios
//   //     .delete("http://localhost:8080/user/delete/" + userId)
//   //     .then((response) => {
//   //       console.log(response);
//   //       alert("Deleted");
//   //       FetchData();
//   //     });
//   // };

//   const onEdit = (tutorialObject) => {
//     console.log(userObject);
//     setTutorialTitle(tutorialObject.tutorialTitle);
//     setTutorialDescription(tutorialObject.tutorialDescription);
//     setTutorialPublished(tutorialObject.tutorialPublished);
//     setEditObject({
//       ...tutorialObject,
//     });
//   };

//   const onEditObjectChangeHandler = (event) => {
//     if (event) {
//       const { name, value } = event.target;
//       setEditObject({
//         ...editObject,
//         [name]: value,
//       });
//     }
//   };
//   const onUserObjectChangeHandler = (event) => {
//     if (event) {
//       const { name, value } = event.target;
//       setUserObject({
//         ...userObject,
//         [name]: value,
//       });
//     }
//   };

//   const onResetRowHandler = () => {
//     setSelectedUserId(-1);
//     setEditObject({
//       userName: "",
//       dateOfBirth: "",
//       phoneNumber: "",
//       email: 0,
//       password: 0,
//       address: 0,
//       panCard: 0,
//       bankName: "",
//       cibilScore: 0,
//       ifsc: 0,
//       accountNumber: null,
//       accountStatus: "",
//     });
//   };
//   const onUpdateRow = () => {
//     if (userId > 0) {
//       axios
//         .put("http://localhost:8080/user/update/" + userId, {
//           userId: userId,

//           ...editObject,
//         })
//         .then((response) => {
//           if (response) {
//             FetchData();
//             alert("updated");
//             onResetRowHandler();
//           }
//         });
//     }
//   };

//   return (
//     <>
//       <h1 className="text-center">From User</h1>
//       <form className="container" onSubmit={onFormSubmit}>
//         <div className="col-md-5">
//           <label htmlFor="name" className="form-label">
//             {" "}
//             User Name
//           </label>
//           <input
//             id="name"
//             className="form-control"
//             name="userName"
//             value={userObject.userName}
//             onChange={onUserObjectChangeHandler}
//             placeholder="Please Enter Your Name"
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="sourcelocation" className="form-label">
//             Phone Number
//           </label>
//           <input
//             id="sourcelocation"
//             className="form-control"
//             name="phoneNumber"
//             value={userObject.phoneNumber}
//             onChange={onUserObjectChangeHandler}
//             placeholder="Please Enter Your Phone Number"
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="destinationlocation" className="form-label">
//             Email{" "}
//           </label>
//           <input
//             id="destinationLocation"
//             className="form-control"
//             name="email"
//             value={userObject.email}
//             onChange={onUserObjectChangeHandler}
//             placeholder="Please EnterYour Email"
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="departuredatetime" className="form-label">
//             Date Of Birth
//           </label>
//           <input
//             id="departuredatetime"
//             className="form-control"
//             type="date"
//             name="dateOfBirth"
//             placeholder="Please EnterYour Date Of Birth"
//             value={userObject.dateOfBirth}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="arrivaldatetime" className="form-label">
//             password
//           </label>
//           <input
//             id="arrivaldatetime"
//             className="form-control"
//             placeholder="Please EnterYour Password"
//             name="password"
//             value={userObject.password}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="economyseatprice" className="form-label">
//             Address
//           </label>
//           <input
//             id="economyseatprice"
//             className="form-control"
//             name="address"
//             placeholder="Please EnterYour Address"
//             value={userObject.address}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="businessseatprice" className="form-label">
//             PanCard
//           </label>
//           <input
//             id="businessseatprice"
//             className="form-control"
//             name="panCard"
//             placeholder="Please EnterYour Pancard"
//             value={userObject.panCard}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="totaleconomyseat" className="form-label">
//             Cibil Score
//           </label>
//           <input
//             id="totaleconomyseat"
//             className="form-control"
//             name="cibilScore"
//             placeholder="Please EnterYour cibil score"
//             value={userObject.cibilScore}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="totaleconomyseat" className="form-label">
//             Bank Name
//           </label>
//           <input
//             id="totaleconomyseat"
//             className="form-control"
//             name="bankName"
//             value={userObject.bankName}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="totalbusinessseats" className="form-label">
//             IFSC
//           </label>
//           <input
//             id="totalbusinessseats"
//             className="form-control"
//             name="ifsc"
//             value={userObject.ifsc}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="availablebusinessseats" className="form-label">
//             Account Number
//           </label>
//           <input
//             id="availablebusinessseats"
//             className="form-control"
//             name="accountNumber"
//             value={userObject.accountNumber}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="availableeconomyseats" className="form-label">
//             Account Status
//           </label>
//           <input
//             id="availableeconomyseats"
//             className="form-control"
//             name="accountStatus"
//             value={userObject.accountStatus}
//             onChange={onUserObjectChangeHandler}
//           />
//         </div>
//         <br />
//         <div className="col-md-5">
//           <button type="submit" className="btn btn-success">
//             {isEditMode ? "update" : "submit"}
//           </button>
//           {isEditMode && <button>Reset:</button>}
//         </div>
//       </form>
//       <h1>User List</h1>

//       <table className="table table-bordered border border-info">
//         <thead>
//           <tr className="table">
//             <th>UserId</th>
//             <th>UserName</th>
//             <th>phoneNumber</th>
//             <th>dateOfBirth</th>
//             <th>Password</th>
//             <th>Address</th>
//             <th>panCard</th>
//             <th>BAnk NAme</th>
//             <th>cibilScore</th>
//             <th>accountNumber</th>
//             <th>account Status</th>
//             <th>Ifsc</th>
//             <th>Option</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userList.map((user) => {
//             return (
//               <tr key={user.userId}>
//                 <td>{user.userId}</td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="userName"
//                       value={editObject.userName}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.userName
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="phoneNumber"
//                       value={editObject.phoneNumber}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.phoneNumber
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="dateOfBirth"
//                       value={editObject.dateOfBirth}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.dateOfBirth
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="email"
//                       value={editObject.email}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.email
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="password"
//                       value={editObject.password}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.password
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="address"
//                       value={editObject.address}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.address
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="bankName"
//                       value={editObject.bankName}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.bankName
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="ifsc"
//                       value={editObject.ifsc}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.ifsc
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="accountNumber"
//                       value={editObject.accountNumber}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.accountNumber
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="cibilScore"
//                       value={editObject.cibilScore}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.cibilScore
//                   )}
//                 </td>
//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <input
//                       name="accountStatus"
//                       value={editObject.accountStatus}
//                       onChange={onEditObjectChangeHandler}
//                     />
//                   ) : (
//                     user.accountStatus
//                   )}
//                 </td>

//                 <td>
//                   {selectedUserId === user.userId ? (
//                     <>
//                       <button className="btn btn-info" onClick={onUpdateRow}>
//                         Update
//                       </button>
//                       <button onClick={onResetRowHandler}> Reset</button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => {
//                           onDeleteHandler(user.userId);
//                         }}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className="btn-btn-secondary"
//                         onClick={() => {
//                           onEdit(user);
//                         }}
//                       >
//                         Edit:
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// };

// // import React, { Component } from "react";

// // export default class Tutorial extends Component {
// //   render() {
// //     return (
// //       <>
// //         <h1>Tutorial details</h1>
// //         <form>
// //           <div class="row mb-3">
// //             <label for="inputEmail3" class="col-sm-2 ">
// //               Title :
// //             </label>
// //             <div class="col-sm-3">
// //               <input
// //                 placeholder="Enter the Tutorial Title"
// //                 type="email"
// //                 class="form-control"
// //                 id=""
// //               />
// //             </div>
// //           </div>
// //           <div class="row mb-3">
// //             <label for="inputEmail3" class="col-sm-2 ">
// //               Describtion :
// //             </label>
// //             <div class="col-sm-3">
// //               <input
// //                 placeholder="Describtion of Tutorial"
// //                 type="email"
// //                 class="form-control"
// //                 id=""
// //               />
// //             </div>
// //           </div>
// //           <div class="row mb-3">
// //             <label for="inputEmail3" class="col-sm-2 ">
// //               Published :
// //             </label>
// //             <div class="col-sm-3">
// //               <input
// //                 placeholder="True/Fasle"
// //                 type="email"
// //                 class="form-control"
// //                 id=""
// //               />
// //             </div>
// //           </div>
// //           <button type="submit" class="btn btn-success">
// //             Submit
// //           </button>
// //         </form>
// //       </>
// //     );
// //   }
// // }
