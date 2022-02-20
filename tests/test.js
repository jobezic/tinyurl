const Express = require('express');
const app = Express();
require('dotenv').config({ path: './config/.env' });
const mongoose = require("mongoose");
const supertest = require("supertest");

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use('/api', require('../app/routes/urls'));
app.use('/', require('../app/routes/index'));

beforeEach((done) => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("POST /api/tinify", () => {
  it("returns 400 if the passed url is not valid", async () => {
    await supertest(app).post("/api/tinify")
      .send({ originalUrl: "https:////www.github.com" })
      .set('Accept', 'application/json')
      .expect(400)
  });

  it("returns a new tiny url", async () => {
    await supertest(app).post("/api/tinify")
      .send({ originalUrl: "https://www.github.com" })
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('tinyUrl');
      });
  });
});

describe("GET /", () => {
  it("returns 'not found' if the urlId does not exist", async () => {
    await supertest(app).get("/not_existent_url_id")
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
        expect(response.body).toBe('not found');
      });
  });

  test("successfully redirects to the original site with a valid urlId", async () => {
    const postResponse = await supertest(app).post("/api/tinify")
      .send({ originalUrl: "https://www.github.com" })
      .set('Accept', 'application/json')
      .expect(200);

    const urlId = postResponse.body.urlId;

    await supertest(app).get(`/${urlId}`)
      .set('Accept', 'application/json')
      .expect(302)
      .expect('Location', 'https://www.github.com')
  });
});
