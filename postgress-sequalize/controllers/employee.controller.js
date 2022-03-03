// const db = require("../models/index");
// const res = require("express/lib/express");
// const employeeDb = db.employees;
// const employeeModel = require("../models/employee.model");
// //const { employees } = require("../models/index");

// //create and save
// exports.create = async (empName, empId, empEmail, res) => {
//   console.log("valuessss", empName, empId, empEmail);
//   const employee = {
//     empName: empName,
//     empId: empId,
//     empEmail: empEmail,
//   };
//   console.log("eeeeeeeeeeeeeeeee", employee);
//   // const data = await employeeDb.findAll();
//   const responseData = await employeeDb
//     .create(employee)
//     .then((data) => {
//       console.log("hello from create", data);
//       return data;
//     })
//     .catch((error) => {
//       console.log("data", error);
//     });
// };

// //==============================================================
// //get all emp
// exports.getAllData = async (req, res) => {
//   // const res = await employeeDb.findAll();
//   return responseData;
// };

// //===============================================================
// //get employee by Id
// exports.getEmpById = async (id, res) => {
//   console.log("data", id);

//   const responseData = await employeeDb.findByPk(id);
//   console.log("sssssssssss", responseData);
// };

// //=========================================
// //update by id
// exports.updateData = async (id, bodyData, res) => {
//   // console.log(id, bodyData);
//   const responseData = await employeeDb.update(bodyData, { where: { id: id } });
//   console.log("responsedata", responseData);
//   return responseData;
// };
// // //=======================updateAll=============================
// // exports.updateAllData = async (bodyData, res) => {
// //   const responseData = await employeeDb.update(bodyData, { where: {} });
// //   return responseData;
// // };
// // //===================Delete By Id==================================================================================
// // exports.deleteById = async (id, res) => {
// //   //const id = req.params.id;
// //   const responseData = await employeeDb.destroy({
// //     where: { id: id }, //to select by id
// //     // truncate: true,
// //   });
// //   //console.log("resposedata", responseData);
// //   return responseData;
// // };
// // //=======================Delete All==================================================
// // // Delete all Tutorials from the database.
// // exports.deleteAll = async (req, res) => {
// //   const resposedata = await employeeDb.destroy({
// //     where: {},
// //     truncate: true,
// //   });
// // };
