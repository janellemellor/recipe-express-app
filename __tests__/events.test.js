// require('dotenv').config();

// const request = require('supertest');
// const app = require('../lib/app');
// const connect = require('../lib/utils/connect');
// const mongoose = require('mongoose');
// const Recipe = require('../lib/models/Recipe');
// const Event = require('../lib/models/Event');

// describe('app routes', () => {
//   beforeAll(() => {
//     connect();
//   });

//   beforeEach(() => {
//     return mongoose.connection.dropDatabase();
//   });

//   afterAll(() => {
//     return mongoose.connection.close();
//   });

//   it('creates an event', () => {
//     return request(app)
//       .post('/api/v1/events')
//       .send({
//         recipeId:
//         dateOfEvent:
//         notes:
//         rating:
//       })
//       .then(res => {
//         expect(res.body).toEqual({
          
//           __v: 0
//         });
//       });
//   });

//   it('gets all events', async() => {
//     const events = await Recipe.create([
//       { name: 'cookies', directions: [] },
//       { name: 'cake', directions: [] },
//       { name: 'pie', directions: [] }
//     ]);

//     return request(app)
//       .get('/api/v1/events')
//       .then(res => {
//         events.forEach(event => {
//           expect(res.body).toContainEqual({
//             _id: event._id.toString(),
//             name: event.name
//           });
//         });
//       });
//   });

//   it('gets a specific event', async() => {
//     const event = await Recipe.create(
//       { name: 'cookies', 
//         directions: [
//           'preheat oven to 375',
//           'mix ingredients',
//           'put dough on cookie sheet',
//           'bake for 10 minutes'
//         ], 
//         ingredients: [{
//           name: 'sugar',
//           amount: 2,
//           measurement: 'teaspoon'
//         }]
//       });

//     return request(app)
//       .get(`/api/v1/events/${event._id}`)
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           name: 'cookies',
//           directions: [
//             'preheat oven to 375',
//             'mix ingredients',
//             'put dough on cookie sheet',
//             'bake for 10 minutes'
//           ],
//           ingredients: [{
//             _id: expect.any(String),
//             name: 'sugar',
//             amount: 2,
//             measurement: 'teaspoon'
//           }],
//           __v: 0
//         });
//       });
//   });


//   it('updates a event by id', async() => {
//     const event = await Recipe.create({
//       name: 'cookies',
//       directions: [
//         'preheat oven to 375',
//         'mix ingredients',
//         'put dough on cookie sheet',
//         'bake for 10 minutes'
//       ],
//       ingredients: [{
//         name: 'sugar',
//         amount: 2,
//         measurement: 'teaspoon'
//       }]
//     });

//     return request(app)
//       .patch(`/api/v1/events/${event._id}`)
//       .send({ name: 'good cookies' })
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           name: 'good cookies',
//           directions: [
//             'preheat oven to 375',
//             'mix ingredients',
//             'put dough on cookie sheet',
//             'bake for 10 minutes'
//           ],
//           ingredients: [{
//             _id: expect.any(String),
//             name: 'sugar',
//             amount: 2,
//             measurement: 'teaspoon'
//           }],
//           __v: 0
//         });
//       });
//   });

//   it('deletes a specific event', async() => {
//     const event = await Recipe.create(
//       { name: 'cookies', 
//         directions: [
//           'preheat oven to 375',
//           'mix ingredients',
//           'put dough on cookie sheet',
//           'bake for 10 minutes'
//         ], 
//         ingredients: [{
//           name: 'sugar',
//           amount: 2,
//           measurement: 'teaspoon'
//         }]
//       });

//     return request(app)
//       .get(`/api/v1/events/${event._id}`)
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           name: 'cookies',
//           directions: [
//             'preheat oven to 375',
//             'mix ingredients',
//             'put dough on cookie sheet',
//             'bake for 10 minutes'
//           ],
//           ingredients: [{
//             _id: expect.any(String),
//             name: 'sugar',
//             amount: 2,
//             measurement: 'teaspoon'
//           }],
//           __v: 0
//         });
//       });
//   });


// });
