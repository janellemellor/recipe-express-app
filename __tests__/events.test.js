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
  
    event = await Event.create([
      { recipeId: recipe._id,
        dateOfEvent: new Date(),
        notes: 'best.cookie.ever',
        rating: 5 }
    ]);
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

  
  it('gets all recipes', async() => {
    const recipes = await Recipe.create([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ]);

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name
          });
        });
      });
  });

  it('gets a specific recipe and all events associated', async() => {
    const recipe = await Recipe.create(
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

    await Event.create([
      { recipeId: recipe.id,
        dateOfEvent: Date.now(),
        notes: 'best.cookie.ever',
        rating: 5 },
      { recipeId: recipe.id,
        dateOfEvent: Date.now(),
        notes: 'never make again',
        rating: 1 },
      { recipeId: recipe.id,
        dateOfEvent: Date.now(),
        notes: 'pretty ok cookie',
        rating: 3 },
    ]);

    return request(app)
      .get(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body.events).toHaveLength(3);
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{
            _id: expect.any(String),
            name: 'sugar',
            amount: 2,
            measurement: 'teaspoon'
          }],
          events: expect.any(Array),
          __v: 0
        });
      });
  });


  it('updates a recipe by id', async() => {
    const recipe = await Recipe.create({
      name: 'cookies',
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

    return request(app)
      .patch(`/api/v1/recipes/${recipe._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{
            _id: expect.any(String),
            name: 'sugar',
            amount: 2,
            measurement: 'teaspoon'
          }],
          __v: 0
        });
      });
  });

  it('deletes a specific recipe and all associated events', async() => {
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
