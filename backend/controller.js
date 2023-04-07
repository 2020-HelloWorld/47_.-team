const config = require('config');
const expressTypes = require("express");
const operations = require('./operations');
const BC_API = config.get('BC_API');
const FormData = require('form-data');
const axios = require('axios');
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// define the controller
const controller = {
  hello: (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    // call the model
    const data = { data: "Hello World!" };
    // send the response
    res.send(data);
  },
  isLoggedIn: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res,
    next
  ) => {
    // await delay(1000);
        var token =  req.body.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was stored
  let check = await operations.verifyTok(token);
    if (!check.auth){
        return res.status(401).json({
        error: true,
        message: "Invalid token."
    });
    }
   
    // get basic user details
    req.body.username = check.username;
    next()
  },
  verifyToken: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    var token =  req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was stored
  let check = await operations.verifyTok(token);
    if (!check.auth){
        return res.status(401).json({
        error: true,
        message: "Invalid token."
    });
    }
   console.log(check.username)
    // get basic user details
    var userObj = await operations.getCleanUser(check.username);
    return res.json({ user: userObj, token });
  },
  login: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {

    console.log(req.body)
    const user = req.body.username;
    const pwd = req.body.password;
    
    // return 400 status if username/password does not exist
    if (!user || !pwd) {
        return res.status(400).json({
        error: true,
        message: "Username or Password required."
        });
    }

     //get password for the user
    const userData = await operations.checkUser(user)
    console.log(userData.password)
    // return 401 status if the credential is not match.
    if (user !== userData.username || pwd !== userData.password) {
        return res.status(401).json({
        error: true,
        message: "Username or Password is Wrong."
        });
    }
    
    // generate token
    const token = operations.generateToken(userData);
    // get basic user details
    const userObj = await operations.getCleanUser(userData.username);
    // store token of current user
    operations.storeTok(token,userData.username)
    // return the token along with user details
    return res.json({ user: userObj, token });
  },
  fetchBalance: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username } = req.body;
    const formData = new FormData();
    formData.append('username', username);
    let balance;
    console.log(1)
    try{
      balance = await axios.post(`${BC_API}/fetch/userbalance`, formData);
      return res.json( balance.data );
    }catch(err){
      console.log(err)
      return res.status(400).json({ balance: null })
    }
    
  },
  fetchHistory: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username } = req.body;
    const formData = new FormData();
    formData.append('username', username);
    let history;
    try{
      history = await axios.post(`${BC_API}/fetch/history`, formData);
      return res.json({ history: history.data });
    }catch(err){
      return res.status(400).json({ history: []})
    }
  },
  createUser: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username } = req.body;
    const formData = new FormData();
    formData.append('username', username);
    let resp;
    try{
      resp = await axios.post(`${BC_API}/create/user`, formData);
      return res.json({ ok: resp.data.ok });
    }catch(err){
      return res.status(400).json({ ok: "error"})
    }
  },
  claimCredits: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username, recipient, amount, token_type, doc_id } = req.body;
    const formData = new FormData();
    formData.append('recipient', username);
    formData.append('amount', username);
    formData.append('token_type', username);
    formData.append('doc_id', username);
    let resp;
    try{
      resp = await axios.post(`${BC_API}/claim/credits`, formData);
      return res.json({ ok: resp.data.ok });
    }catch(err){
      return res.status(400).json({ ok: "error"})
    }
  },
  intiateTransaction: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username, recipient, amount, token_type } = req.body;
    const formData = new FormData();
    formData.append('recipient', recipient);
    formData.append('amount', amount);
    formData.append('token_type', token_type);
    formData.append('sender', username);
    let resp;
    try{
      resp = await axios.post(`${BC_API}/initiate/transaction`, formData);
      return res.json({ ok: resp.data.ok });
    }catch(err){
      return res.status(400).json({ ok: "error"})
    }
  },
  convertCredits: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username, amount } = req.body;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('amount', amount);
    let resp;
    try{
      resp = await axios.post(`${BC_API}/convert/credits`, formData);
      console.log(resp.data )
      return res.json({ ok: resp.data.ok });
    }catch(err){
      return res.status(400).json({ ok: "error"})
    }
  },

  uploadDetails: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username, doc, description } = req.body;
    
    let resp;
    try{
      resp = await operations.saveDoc({username, doc, description, dG: null, dS: null ,status:'pending'});
      return res.json({ ok: "success" });
    }catch(err){
      console.log(err)
      return res.status(400).json({ ok: "error"})
    }
  },
  fetchApprovalData: async(
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username } = req.body;
    
    let resp;
    try{
      resp = await operations.approvalData({status:'pending'});
      return res.json({ appData: resp });
    }catch(err){
      console.log(err)
      return res.status(400).json({appData: []})
    }
  },
  appApproval: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    try{

      console.log(req.body)
      const { username,recipient,id,$G,$S,doc_id } = req.body;
      await operations.updateApproval({username: recipient, "dG": $G, "dS": $S, status: 'approved'},{id:id});
      
      const formData1 = new FormData();
      formData1.append('recipient', recipient);
      formData1.append('token_type', "$G");
      formData1.append('amount', $G);
      formData1.append('doc_id', doc_id);
      await axios.post(`${BC_API}/claim/credits`, formData1);

      const formData2 = new FormData();
      formData2.append('recipient', recipient);
      formData2.append('amount', $S);
      formData2.append('token_type', "$S");
      formData2.append('doc_id', doc_id);
      await axios.post(`${BC_API}/claim/credits`, formData2);

      // return the token along with user details
      return res.json({ ok: "success" });
    }catch(err){
      console.log(err)
      return res.status(400).json({ ok: "error" });
    }

  },
};

// export the controller
module.exports = controller;

