const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunchWithID,
} = require("./launches.controller");

const launchesRouter = require("express").Router();

launchesRouter.route("/").get(httpGetAllLaunches).post(httpAddNewLaunch);
launchesRouter.route("/:id").delete(httpAbortLaunchWithID);

module.exports = launchesRouter;
