import express from "express";
import { config } from "./config";
import { connect } from "./db/connection";
import projectRouter from "./routes/projectRouter";
import handleErrors from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
//creating new express app
const app = express();
//port will be the one defined in .env file or 8000
const PORT = config.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
//parse the incoming requests with JSON payloads so it can be accessed in req.body
app.use(express.json());
app.use(cookieParser());
//using projectRouter
app.use(projectRouter);
app.use(authRouter);
//settign view engine
app.set("view engine", "ejs");
//setting path for view engine
app.set("views", `${__dirname}/views`);
//setting static folder so css and other static parts of application can be used
app.use(express.static(`${__dirname}/public`));
app.use(handleErrors);

(async function () {
  //connect to db
  await connect();

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
})();

//toDo napraviti views, dodati public folder i promisliti kako napraviti error handle (middleware il inekako drugacije?)
