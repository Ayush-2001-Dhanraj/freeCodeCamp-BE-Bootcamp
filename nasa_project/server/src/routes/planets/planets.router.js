const express = require("express");

const { httpGetAllPlanets } = require("./planets.controller");

const planetRouter = express.Router();

planetRouter.route("/").get(httpGetAllPlanets);

module.exports = planetRouter;
