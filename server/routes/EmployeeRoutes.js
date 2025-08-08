const express = require('express');
const database=require("../connect")
const objectId= require("mongodb").ObjectId
const verifyToken = require("../components/Authenticate");
const { formatPerson }= require("../components/Formatperson");
const { VERSION_URL, EMPLOYEE_URL, EMPLOYEE_VIEW_URL, EMPLOYEE_ID_URL } = require('../utils/ApplicationUrl');
const { EMPLOYEE_DB, USER_DB } = require('../utils/DbCollection');
const { EMPLOYEE_NOT_FOUND, EMPLOYEE_CREATE, EMPLOYEE_UPDATE, EMPLOYEE_DELETE } = require('../utils/Message');

let employeeRoutes = express.Router()

// Get all

employeeRoutes.route(`${VERSION_URL}${EMPLOYEE_URL}`).get(verifyToken, async (req, res) => {
  try {
    let db = database.getDb();

    const employees = await db.collection(`${EMPLOYEE_DB}`).find({}).toArray();

    const userIds = employees.map(e => e.createdBy).filter(Boolean);
    const users = await db.collection(`${USER_DB}`).find({ _id: { $in: userIds } }).toArray();

    const dataWithUser = employees.map(emp => {
      const user = users.find(u => u._id.toString() === emp.createdBy?.toString());
     return {
    employee: {
      ...formatPerson(emp),
      createdByUser: user ? formatPerson(user) : null
    }
  };
    });

    res.json(dataWithUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one

employeeRoutes.route(`${VERSION_URL}${EMPLOYEE_ID_URL}`).get(verifyToken, async (req, res) => {
  try {
    let db = database.getDb();

    const emp = await db.collection(`${EMPLOYEE_DB}`).findOne({ _id: new objectId(req.params.id) });
 
    let user = null;
    if (emp.createdBy) {
      user = await db.collection(`${USER_DB}`).findOne({ _id: new objectId(emp.createdBy) });
    }

    res.json({
      ...emp,
      createdByUser: user ? formatPerson(user) : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one

employeeRoutes.route(`${VERSION_URL}${EMPLOYEE_VIEW_URL}`).get(verifyToken, async (req, res) => {
  try {
    let db = database.getDb();

    const emp = await db.collection(`${EMPLOYEE_DB}`).findOne({ _id: new objectId(req.params.id) });

    if (!emp) {
      return res.status(404).json({ message: `${EMPLOYEE_NOT_FOUND}` });
    }

 
    let user = null;
    if (emp.createdBy) {
      user = await db.collection(`${USER_DB}`).findOne({ _id: new objectId(emp.createdBy) });
    }

    res.json({
      employee:formatPerson(emp),
      createdByUser: user ? formatPerson(user) : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// create one

employeeRoutes.route(`${VERSION_URL}${EMPLOYEE_URL}`).post(verifyToken,async (request, response)=>{
  let db= database.getDb()
  const userId = request.user.id;
  let mongoObject={
    firstName:request.body.firstName,
    lastName:request.body.lastName,
    email:request.body.email,
    phone:request.body.phone,
    dob:request.body.dob,
    gender:request.body.gender,
    createdBy: new objectId(userId)
  }
  let data = await db.collection(`${EMPLOYEE_DB}`).insertOne(mongoObject)
  response.json({ success: true, message: `${EMPLOYEE_CREATE}`, userId: data.insertedId });
})


// update one

employeeRoutes.route(`${VERSION_URL}${EMPLOYEE_ID_URL}`).put(verifyToken,async (request, response)=>{
  let db= database.getDb()
  let mongoObject={
    $set :{
       firstName:request.body.firstName,
       lastName:request.body.lastName,
       email:request.body.email,
       phone:request.body.phone,
       dob:request.body.dob,
       gender:request.body.gender,
    }
  }
  let data = await db.collection(`${EMPLOYEE_DB}`).updateOne({_id:new objectId(request.params.id)}, mongoObject)
  response.json({success: true, message: `${EMPLOYEE_UPDATE}`,data})
})


// Delete one

employeeRoutes.route(`${VERSION_URL}${EMPLOYEE_ID_URL}`).delete(verifyToken,async (request, response)=>{
  let db= database.getDb()
  let data = await db.collection(`${EMPLOYEE_DB}`).deleteOne({_id: new objectId(request.params.id)})
          response.json({success: true, message: `${EMPLOYEE_DELETE}`,data})
  
})


module.exports=employeeRoutes