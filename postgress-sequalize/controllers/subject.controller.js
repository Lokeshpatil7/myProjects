// const db = require("../models/index");
// const res = require("express/lib/express");
// const subjectDb = db.subjects;
// const subjectModel = require("../models/subject.model");
// // const Op = db.Sequelize.Op;

// //=========================================================================
// //Create and Save a new subject in db
// exports.create = async (subjectName, teacher, res) => {
//   //create siubject table in Db-Postgres
//   const subject = {
//     subjectName: subjectName,
//     teacher: teacher,
//   };

//   // save subject in the database
//   const responseData = await subjectDb
//     .create(subject)
//     .then((data) => {
//       console.log("is response comming!!!", data);
//       return data;
//       // res.status(200).send("Success");
//     })
//     .catch((error) => {
//       console.log("data", error);
//     });
//   console.log("response1", responseData);
// };

// //=========================================================================
// //get all data
// exports.getAllData = async (req, res) => {
//   const responseData = await subjectDb.findAll();
//   // console.log("data1", responseData);
//   return responseData;
// };

// //=========================================================================
// //get data by id
// exports.getDataById = async (id, res) => {
//   console.log("data", id);
//   // const tutorial = {
//   //   id: id,
//   // };
//   const responseData = await subjectDb.findByPk(id);
//   console.log("from controller", responseData);
//   return responseData;
// };

// //=======================Update by id==================================================================
// exports.updateData = async (id, bodyData, res) => {
//   // console.log(id, bodyData);
//   const responseData = await subjectDb.update(bodyData, { where: { id: id } });
//   console.log("responsedata", responseData);
//   return responseData;
// };

// //=======================updateAll=============================
// exports.updateAllData = async (bodyData, res) => {
//   const responseData = await subjectDb.update(bodyData, { where: {} });
//   return responseData;
// };

// //===================Delete By Id==================================================================================
// // Delete a Tutorial with the specified id in the request
// exports.deleteById = async (id, res) => {
//   //const id = req.params.id;

//   const responseData = await subjectDb.destroy({
//     where: { id: id }, //to select by id
//     // truncate: true,
//   });
//   //console.log("resposedata", responseData);
//   return responseData;
// };

// //=======================Delete All==================================================
// // Delete all Tutorials from the database.
// exports.deleteAll = async (req, res) => {
//   const resposedata = await subjectDb.destroy({
//     where: {},
//     truncate: true,
//   });
// };
