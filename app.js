/**
 * Module dependencies.
 */
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { createServer } from "http";
import createError from "http-errors";
import logger from "morgan";
import mongoose from "mongoose";

import usersRouter from "./src/routes/users.js";
import * as helper from "./src/utils/helper.js";

dotenv.config();
const port = helper.normalizePort(process.env.PORT || "3000");

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", usersRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * Get port from environment and store in Express.
 */

app.set("port", port);

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", (err) => {
  helper.onError(err, port);
});
server.on("listening", () => helper.onListening);

export default app;
