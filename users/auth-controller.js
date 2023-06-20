import * as usersDao from "./users-dao.js";
var SESSION_USER = null

const AuthController = (app) => {

  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    console.log(req.body)
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  
  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };  

 const update   = (req, res) => { 
    //console.log("updating the first and the last name")
    const user = req.body
    const username = req.body.username;
    //console.log(req.body)
    const curr_user = usersDao.findUserByUsername(username);
    if(curr_user){
        usersDao.updateUser(req.body._id, user)
    }
    res.json(user)
 };

  const profile = (req, res) => {
    //const currentUser = SESSION_USER
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };


  const logout = async (req, res) => {
    //console.log("destroying session")
    req.session.destroy();
    res.sendStatus(200);
  };
 

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
};
export default AuthController;