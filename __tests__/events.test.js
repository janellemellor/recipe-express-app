require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../lib/models/Recipe');
const Event = require('../lib/models/Event');

describe('event routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let recipe;
  let event;
  beforeEach(async() => {
    recipe = await Recipe.create(
      { name: 'cookies', 
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ], 
        ingredients: [{
          name: 'sugar',
          amount: 2,
          measurement: 'teaspoon'
        }]
      });
  
    event = await Event.create(
      { recipeId: recipe._id,
        dateOfEvent: new Date(),
        notes: 'best.cookie.ever',
        rating: 5 }
    );
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an event', () => {
    return request(app)
      .post('/api/v1/events')
      .send({
        recipeId: recipe._id,
        dateOfEvent: Date.now(),
        notes: 'best.cookie.ever',
        rating: 5 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: recipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'best.cookie.ever',
          rating: 5, 
          __v: 0
        });
      });
  });

  
  it('gets all events', async() => {
    const events = await Event.create([
      { recipeId: recipe._id,
        dateOfEvent: Date.now(),
        notes: 'best.cookie.ever',
        rating: 5 },
      { recipeId: recipe._id,
        dateOfEvent: Date.now(),
        notes: 'never make again',
        rating: 1 },
      { recipeId: recipe._id,
        dateOfEvent: Date.now(),
        notes: 'pretty ok cookie',
        rating: 3 },
    ]);

    return request(app)
      .get('/api/v1/events')
      .then(res => {
        events.forEach(event => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(event)
          ));
        });
      });
  });

  it('gets a specific event', async() => {
    return request(app)
      .get(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: JSON.parse(JSON.stringify(recipe)),
          dateOfEvent: expect.any(String),
          notes: 'best.cookie.ever',
          rating: 5, 
          __v: 0
        });
      });
  });


  it('updates an event by id', async() => {
    return request(app)
      .patch(`/api/v1/events/${event._id}`)
      .send({ rating: 6 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: recipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'best.cookie.ever',
          rating: 6, 
          __v: 0
        });
      });
  });

  it('deletes a specific event', async() => {
    return request(app)
      .delete(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: recipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'best.cookie.ever',
          rating: 5,
          __v: 0
        });
      });
  });
});
