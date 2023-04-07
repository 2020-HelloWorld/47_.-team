const config = require('config');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient
let ConnectionURL = config.get('database');
// generate token and return it
function generateToken(user) {
  if (!user) return null;
 
  var u = {
    username: user.username,
    password: user.password
  };
 
  return jwt.sign(u, config.get('jwtTok'), {
    expiresIn: 1 // expires in 24 hours
  });
}
 
// return basic user details
async function getCleanUser(username) {
  if (!username) return null;
  this.res=[]
    const client = await  MongoClient.connect(ConnectionURL)
   try {
    db = client.db('edcred')
    res = await db.collection("users").find({username: username}).toArray();
   } catch (err) {
    throw err
   } finally {
     client.close()
   }
  if (res[0])
    return {name: res[0].name, username: username, email: res[0].email, role: res[0].role }
  else
    return {name: null, username: null}
}
 
// verify token
async function verifyTok(token) {
  this.res=[]
    const client = await  MongoClient.connect(ConnectionURL)
   try {
    db = client.db('edcred')
    res = await db.collection("sessions").find({token:token}).toArray();
   } catch (err) {
    throw err
   } finally {
     client.close()
   }
  if (res[0])
    return {auth:true,username:res[0].username, role: res[0].role}
  else
    return {auth:false,username:res[0]}

}

//check user for password
async function checkUser(username) {
  this.res=[]
    const client = await  MongoClient.connect(ConnectionURL)
   try {
    db = client.db('edcred')
    res = await db.collection("users").find({username:username}).toArray();
   } catch (err) {
    throw err
   } finally {
     client.close()
   }
  if (res[0])
    return {username: res[0].username, password: res[0].password}
  else
    return {username: "", password: ""}

}

//store token
async function storeTok(token,username) {
  this.res=[]
    const client = await  MongoClient.connect(ConnectionURL)
   try {
    db = client.db('edcred')
    var query = {username:username}
    var newvalues = { $set: {token: token } };
    await db.collection("sessions").updateOne(query,newvalues);
   } catch (err) {
    throw err
   } finally {
     client.close()
   }
}


//get details of user
async function fetchDetails(data){
  this.res=[]
  const client = await  MongoClient.connect(ConnectionURL)
   try {
    db = client.db('edcred')
    res = await db.collection("users").find(data).toArray();
   } catch (err) {
    throw err
   } finally {
     client.close()
   }
   if (res[0])
    return res[0]
  else
    return null
}

//upload details of Doc
async function saveDoc(data){
  this.res=[]
  const client = await  MongoClient.connect(ConnectionURL)
   try {
    db = client.db('edcred')
    res = await db.collection("resources").insertOne(data);
   } catch (err) {
    throw err
   } finally {
     client.close()
   }
   if (res[0])
    return res[0]
  else
    return null
}


module.exports = {
  generateToken,
  getCleanUser,
  verifyTok,
  checkUser,
  storeTok,
  fetchDetails,
  saveDoc
}