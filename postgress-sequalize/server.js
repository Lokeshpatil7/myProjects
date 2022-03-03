const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const tutorialModel = require("./models/tutorial.model");
const tutorialController = require("./controllers/tutorial.controller");
const database = require("./models/index");
const tutorialDb = database.tutorials;
const employeeController = require("./controllers/employee.controller");
//const subjectModel = require("./models/subject.model");
//const subjectController = require("./controllers/subject.controller");
//const subjectsDb = database.subjects;

const app = express();
//console.log("8081");

app.use(express.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//cors policy error
const corsOptions = {
  origin: "*",

  methods: ["GET", "POST", "DELETE", "PUT"], //declered all methods

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
const db = require("./models");
const { tutorials } = require("./models");

const res = require("express/lib/response");

//===============////database//////==============================================================

db.sequelize.sync({ alter: true }).then(() => {
  console.log("re-sync db.");
});
//========================**********tutorial***********=====================================================
//create/add
app.post("/api/tutorials/add", (req, res) => {
  console.log(req.body);
  const data = tutorialController.create(
    req.body.title,
    req.body.description,
    !!req.body.published,
    req.body.mobileNo
    // req.body.comment
  );
  //const updatedData = tutorialController;
  // console.log("response2", data);
  if (data) {
    res.status(200).send("added");
  }
});

//==============================================================================================
//get all data
app.get("/api/tutorials/getData", async (req, res) => {
  const data = await tutorialController.getAllData();
  if (data) {
    res.status(200).send(data);
  }
});

//=================================================================================================
//get data by id
app.get("/api/tutorials/getData/:id", async (req, res) => {
  const id = req.params.id;
  const data = await tutorialController.getDataById(id);
  console.log("data12", data);
  if (data) {
    res.status(200).send(data);
  }
});
//   if (!data)
//     res.status(404).send("the tutorial with the given id was not found");
//   res.send(data);
// });

//=============Update by id==========================================================================

app.put("/api/tutorials/update/:id", async (req, res) => {
  const id = req.params.id;
  // const data1 = req.body;
  //console.log("data", data1);
  const data = await tutorialController.updateData(id, req.body);
  // console.log("response3", data);
  const updatedData = await tutorialController.getDataById(id);
  // console.log(updatedData);
  if (data) {
    res.status(200).send(updatedData);
  }
});

//============================update All=============================================================
app.put("/api/tutorials/updateAll", async (req, res) => {
  const data = await tutorialController.updateAllData(req.body);
  if (data) {
    res.status(200).send(data);
  }
});

//===========delete request by id=======================================================================
app.delete("/api/tutorials/deleteData/:id", async (req, res) => {
  const id = req.params.id;
  const data = await tutorialController.deleteById(id, req.body);
  // const deletedData = await tutorialController.getDataById(id);
  const allRemainingData = await tutorialController.getAllData();
  console.log("data", data);
  if (data) {
    res.status(200).send(allRemainingData);
  }
});
//=====================delete all========================================================================

app.delete("api/tutorials/deleteAll", async (req, res) => {
  const data = await tutorialController.deleteAll();
  if (data) {
    res.status(200).send("All Data deleted");
  }
});

// //=====onetomany==========================================================
// app.get("/api/tutorials/oneToMany", async (req, res) => {
//   const data = await tutorialController.oneToMany();
//   if (data) {
//     res.status(200).send(data);
//   }
// });

// //=====belongs to========================================================
// app.get("/api/tutorials/belongsto", async (req, res) => {
//   const data = await tutorialController.belongsTo();
//   if (data) {
//     res.status(200).send(data);
//   }
// });

//===============to drop table from DB============================================================

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//===============////database//////==============================================================

// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("re-sync db.");
// });
// //====================***********Subject**********=======================================================

// //create/add
// app.post("/api/subject/add", (req, res) => {
//   console.log(req.body);
//   const data = subjectController.create(req.body.subjectName, req.body.teacher);
//   // console.log("response2", data);
//   if (data) {
//     res.status(200).send("added");
//   }
// });

// //===============================================================================================
// //get all data
// app.get("/api/subject/getData", async (req, res) => {
//   const data = await subjectController.getAllData();
//   if (data) {
//     res.status(200).send(data);
//   }
// });
// //================================================================================================
// //get data by id
// app.get("/api/subject/getData/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = await subjectController.getDataById(id);
//   console.log("data12", data);
//   if (data) {
//     res.status(200).send(data);
//   }
// });

// //=============Update by id======================================================================

// app.put("/api/subject/update/:id", async (req, res) => {
//   const id = req.params.id;
//   // const data1 = req.body;
//   //console.log("data", data1);
//   const data = await subjectController.updateData(id, req.body);
//   // console.log("response3", data);
//   const updatedData = await subjectController.getDataById(id);
//   // console.log(updatedData);
//   if (data) {
//     res.status(200).send(updatedData);
//   }
// });

// //============================update All==============================================================
// app.put("/api/subject/updateAll", async (req, res) => {
//   const data = await subjectController.updateAllData(req.body);
//   if (data) {
//     res.status(200).send(data);
//   }
// });

// //===========delete request by id===============================================================
// app.delete("/api/subject/deleteData/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = await subjectController.deleteById(id, req.body);
//   const allRemainingData = await subjectController.getAllData();
//   console.log("data", data);
//   if (data) {
//     res.status(200).send(allRemainingData);
//   }
// });
// //=====================delete all================================================================

// app.delete("api/subject/deleteAll", async (req, res) => {
//   const data = await subjectController.deleteAll();
//   if (data) {
//     res.status(200).send("All Data deleted");
//   }
// });

// //================**********employee***********================================================
// //create/add
// app.post("/api/employee/add", (req, res) => {
//   console.log("dd", req.body.empEmail);
//   const data = employeeController.create(
//     req.body.empName,
//     req.body.empId,
//     //req.body.id,
//     req.body.empEmail
//   );
//   if (data) {
//     res.status(200).send("Employee Added");
//   }
// });

// //==============post in comment===============
// app.post("/api/comments/add", (req, res) => {
//   console.log(req.body);
//   const data = tutorialController.createComment(
//     req.body.name,
//     req.body.text
//     // req.body.tutorialId
//   );
//   //const updatedData = tutorialController;
//   // console.log("response2", data);
//   if (data) {
//     res.status(200).send("comments added");
//   }
// });

// Use this after the variable declaration
const PORT = 3001;

app.listen(PORT, () => {
  console.log("hello from port 3001...");
});
