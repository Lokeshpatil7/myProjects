// const db = require("../models/index");
// const res = require("express/lib/express");

// const comments = require("../models/index");
// const commentDb = db.comments;
// const commentModel = require("../models/comment.model");

// //=========================================================================
// //Create and Save a new create in db
// exports.createComment = async (name, text, tutorialId, res) => {
//   //create tutorial table in Db-Postgres
//   const comment = {
//     name: name,
//     text: text,
//     tutorialId: tutorialId,
//   };

//   // save comment in the database
//   const responseData = await commentDb
//     .create(comment)
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
//   const responseData = await tutorialDb.findAll();
//   // console.log("data1", responseData);
//   return responseData;
// };

// //=========================================================================
// //get data by id
// exports.getDataById = async (id, res) => {
//   // console.log("data", id);

//   const responseData = await tutorialDb.findByPk(id);
//   console.log("from controller", responseData);
//   return responseData;
// };

// //=======================Update by id==================================================================
// exports.updateData = async (id, bodyData, res) => {
//   // console.log(id, bodyData);
//   const responseData = await tutorialDb.update(bodyData, { where: { id: id } });
//   console.log("responsedata", responseData);
//   return responseData;
// };

// //=======================updateAll==========================================
// exports.updateAllData = async (bodyData, res) => {
//   const responseData = await tutorialDb.update(bodyData, { where: {} });
//   return responseData;
// };

// //===================Delete By Id==================================================================================
// // Delete a Tutorial with the specified id in the request
// exports.deleteById = async (id, res) => {
//   //const id = req.params.id;

//   const responseData = await tutorialDb.destroy({
//     where: { id: id }, //to select by id
//     // truncate: true,
//   });
//   //console.log("resposedata", responseData);
//   return responseData;
// };

// //=======================Delete All==================================================
// // Delete all Tutorials from the database.
// exports.deleteAll = async (req, res) => {
//   const resposedata = await tutorialDb.destroy({
//     where: {},
//     truncate: true,
//   });
// };
// //=============================================================================
// // Find all published Tutorials

// exports.findAllPublished = async (req, res) => {
//   const responseData = await tutorialDb.findAll({ where: { published: true } });
//   return responseData;
// };

// //======================oneToMany==============================================
// exports.oneToMany = async (req, res) => {
//   const responseData = await tutorialDb.findAll({
//     include: [
//       {
//         model: tutorialDb,
//         as: subjects,
//       },
//     ],
//   });
//   // console.log("data1", responseData);
//   return responseData;
// };

// //================belongs to============================================================
// exports.belongsTo = async (req, res) => {
//   const responseData = await subjectDb.findAll({
//     include: [
//       {
//         model: subjectDb,
//         as: tutorial,
//       },
//     ],
//   });
//   // console.log("data1", responseData);
//   return responseData;
// };
// //================================================
// //Create and Save a new Tutorial in db
// exports.createComment = async (name, text, tutorialId, res) => {
//   //create tutorial table in Db-Postgres
//   const comment = {
//     name: name,
//     text: text,
//     tutorialId: tutorialId,
//   };

//   // save comment in the database
//   const responseData = await commentDb
//     .create(comment)
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
