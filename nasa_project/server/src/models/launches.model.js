const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("19 April 2025"),
  target: "Kepler-422 b",
  customers: ["Isro", "Nasa"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  const flightNumber = getAllLaunches().length + 100;

  launches.set(
    flightNumber,
    Object.assign(launch, {
      flightNumber,
      upcoming: true,
      success: true,
      customers: ["Isro", "Nasa"],
    })
  );
}

function launchExistsWithID(id) {
  return launches.has(id);
}

function abortLaunchByID(id) {
  const abortedLaunch = launches.get(id);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  launchExistsWithID,
  abortLaunchByID,
};
