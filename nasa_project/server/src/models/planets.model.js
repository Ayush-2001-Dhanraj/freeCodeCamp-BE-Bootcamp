const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const habitable_planets = [];

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetsData = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitable(data)) habitable_planets.push(data);
      })
      .on("error", (err) => reject(err))
      .on("end", () => {
        console.log(`${habitable_planets.length} Habitable planets found!!`);
        resolve();
      });
  });
};

function getAllPlanets() {
  return habitable_planets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
