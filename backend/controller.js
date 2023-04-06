const config = require('config');
const expressTypes = require("express");
const operations = require('./operations');
const BC_API = config.get('BC_API');
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
    try{
      balance = await axios.post(`${BC_API}/fetch/userbalance`, formData);
      return res.json({ balance: balance.data });
    }catch(err){
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
    formData.append('recipient', username);
    formData.append('amount', username);
    let resp;
    try{
      resp = await axios.post(`${BC_API}/convert/credits`, formData);
      return res.json({ ok: resp.data.ok });
    }catch(err){
      return res.status(400).json({ ok: "error"})
    }
  },
};

// export the controller
module.exports = controller;

// select cast(substring_index ("-7,0",',',1) AS int)+5 AS STRING;
