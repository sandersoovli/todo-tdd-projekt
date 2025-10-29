const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('/todos', () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 400 if done field is missing', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: "Missing done property" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Missing done field"
    });
  });

  it('should create todo successfully', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: "Integration test", done: false });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Integration test");
    expect(response.body.done).toBe(false);
  });

});
