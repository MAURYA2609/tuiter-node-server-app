import express from "express"
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from "cors"
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb+srv://maurya:maurya2609@cluster0.tfc9wmb.mongodb.net/tuiter'
mongoose.connect(CONNECTION_STRING);

const app = express();
 
app.use(
  cors({
    credentials: true,
    origin: "https://a5-inspiring-chebakia-8d7ba0.netlify.app",
    methods: ["GET", "POST","PUT","DELETE"]
  })
 );
 app.use(function (req, res, next) {
  res.header(
      "Access-Control-Allow-Origin",
      "https://a5-inspiring-chebakia-8d7ba0.netlify.app"
  );
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, POST, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.get("/hello", (req, res) => {
  res.send("Hello World how are you! I'm awesome");
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.use(express.json())
AuthController(app)
TuitsController(app);
HelloController(app)
UserController(app)
app.listen(process.env.PORT || 4000);
