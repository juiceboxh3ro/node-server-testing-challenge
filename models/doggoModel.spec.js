const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

describe('server', function() {
  describe('GET /', function() {
    it('should return 200', function() {
      // make a GET request to / endpoint
      return request(server) // return async call to let jest know it should wait
      .get('/')
      .then(res => {
        // assert that the status code is 200
        expect(res.status).toBe(200)
      })
    })
  });

  describe('POST /doggos', function() {
    afterAll(async () => {
      await db('doggos').truncate() // little bobby tables and reset the ids
    });

    it('add doggo to db', async () => {
      // check db is empty
      const existing = await db('doggos')
      expect(existing).toHaveLength(0)

      await request(server)
        .post('/doggos')
        .send({ name: 'edgar', breed: 'pug' })
        .then(res => {
          expect(res.body.message).toBe("doggo created successfully")
        })
      const inserted = await db('doggos').where({ name: 'edgar' })
      expect(inserted).toHaveLength(1)
    });

    it('won\'t allow duplicates', async() => {
      await request(server)
        .post('/doggos')
        .send({ name: 'edgar', breed: 'pug' })
        .then(res => {
          expect(res.status).toBe(500)
        })
    })
  });

  describe('DELETE /doggos', async () => {
    afterAll(async () => {
      await db('doggos').truncate() // little bobby tables and reset the ids
    });

    it('removes a doggo from the db', async () => {
      await request(server)
        // add a doggo to our db first
        .post('/doggos')
        .send({ name: 'edgar', breed: 'pug' })
      
      await request(server)
        .delete('/doggos/1')
        .then(res => {
          expect(res.body.message).toBe("doggo removed successfully")
        })

      const dbCheck = await db('doggos')
      expect(dbCheck).toHaveLength(0)
    });
    
  });
});