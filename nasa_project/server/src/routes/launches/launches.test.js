const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches ", () => {
  test("should respond with 200 status code", async () => {
    await request(app)
      .get("/launches")
      .expect(200)
      .expect("content-type", /json/);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Tellatubby to the mars",
    rocket: "martian roverion",
    target: "Pluto",
    launchDate: "19 April, 2027",
  };

  const launchDataWithoutDate = {
    mission: "Tellatubby to the mars",
    rocket: "martian roverion",
    target: "Pluto",
  };

  const launchDataWithInvalidDate = {
    ...completeLaunchData,
    launchDate: "Hello",
  };

  test("should respond with 201 created status code", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect(201)
      .expect("content-type", /json/);

    const responseDate = new Date(response.body.launchDate).valueOf();
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect(400);

    expect(response.body).toStrictEqual({ err: "Launch properties missing!" });
  });

  test("should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      err: "Invalid Date value!!",
    });
  });
});
