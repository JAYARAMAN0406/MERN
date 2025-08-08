const express = require('express');
const database=require("../connect")
const objectId= require("mongodb").ObjectId
const encryptPassword = require("../components/EncryptPassword");
const { VERSION_URL, USER_URL, USER_ID_URL } = require('../utils/ApplicationUrl');
const { USER_DB } = require('../utils/DbCollection');
const { DATA_NOT_FOUND, USER_CREATE } = require('../utils/Message');

let userRoutes = express.Router()

// Get all

userRoutes.route(`${VERSION_URL}${USER_URL}`).get(async (request, response)=>{
  let db= database.getDb()
  let data = await db.collection(`${USER_DB}`).find({}).toArray()
  if (data.length > 0){
          response.json(data)
  }else{
    throw new Error(`${DATA_NOT_FOUND}`);
    
  }
})

// Get one

userRoutes.route(`${VERSION_URL}${USER_ID_URL}`).get(async (request, response)=>{
  let db= database.getDb()
  let data = await db.collection(`${USER_DB}`).findOne({_id: new objectId(request.params.id)})
  if (Object.keys(data).length > 0){
          response.json(data)
  }else{
    throw new Error(`${DATA_NOT_FOUND}`);
    
  }
})

// create one

userRoutes.route(`${VERSION_URL}${USER_URL}`).post(async (request, response)=>{
  let db= database.getDb()
    const hashedPassword = await encryptPassword(request.body.password);
  let mongoObject={
    firstName:request.body.firstName,
    lastName:request.body.lastName,
    email:request.body.email,
    phone:request.body.phone,
    dob:request.body.dob,
    gender:request.body.gender,
    password:hashedPassword
  }
  let data = await db.collection(`${USER_DB}`).insertOne(mongoObject)
  res.json({ success: true, message: `${USER_CREATE}`, userId: data.insertedId });
})


// update one

userRoutes.route(`${VERSION_URL}${USER_ID_URL}`).put(async (request, response)=>{
  let db= database.getDb()
  let mongoObject={
    $set :{
       firstName:request.body.firstName,
       lastName:request.body.lastName,
       email:request.body.email,
       phone:request.body.phone,
       dob:request.body.dob,
       gender:request.body.gender,
       password:request.body.password
    }
  }
  let data = await db.collection(`${USER_DB}`).updateOne({_id:new objectId(request.params.id)}, mongoObject)
  response.json(data)
})


// Delete one

userRoutes.route(`${VERSION_URL}${USER_ID_URL}`).delete(async (request, response)=>{
  let db= database.getDb()
  let data = await db.collection(`${USER_DB}`).deleteOne({_id: new objectId(request.params.id)})
          response.json(data)
  
})


module.exports=userRoutes