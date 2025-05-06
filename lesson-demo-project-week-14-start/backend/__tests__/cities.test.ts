import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { pool  } from "../src/db/db";

import app from '../src/app'
import { City, CityCreateRequest } from "../src/models/cities";

const loggedInUser = {
  id: '',
  email: '',
  token: ''
}

beforeAll(async () => {
  pool.query('DELETE FROM users WHERE email=$1', ['john.wayne@domain.com'])
  pool.query('DELETE FROM cities WHERE capital=$1', ['Test Town'])
  pool.query('DELETE FROM cities WHERE capital=$1', ['Test Town 2'])

  const data = {
    name: 'John Wayne',
    email: 'john.wayne@domain.com',
    password: 'password123'
  }

  const response = await request(app)
    .post('/api/users/signup')
    .set('Accept', 'application/json')
    .send(data)

  loggedInUser.id = response.body.id
  loggedInUser.email = response.body.email
  loggedInUser.token = response.body.token

  console.log(loggedInUser)
})

describe('GET Cities endpoint', () => {

  test('should return 200', (done) => {
    request(app)
      .get('/api/cities')
      .expect(200)
      .end(done)
  })

  test("should return 200 and valid JSON", async () => {
    const response = await request(app)
      .get("/api/cities")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          capital: "Oslo",
          country: "Norway",
        }),
        expect.objectContaining({
          id: 2,
          capital: "Pretoria",
          country: "South Africa",
        }),
        expect.objectContaining({
          id: 3,
          capital: "Helsinki",
          country: "Finland",
        }),
      ])
    );
  });

  test('should return 1 city', async () => {
    const response = await request(app)
      .get('/api/cities/2')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        capital: 'Pretoria',
        country: 'South Africa',
      }),
    );
  });

  test('should return 404 and not found', async() => {
    const response = await request(app)
      .get('/api/cities/202')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual( {"message": "City not found"} );
    
  })
})

describe('POST Cities endpoint', () => { 
  test('should create a new city', async() => {
    const city: CityCreateRequest = {
      capital: "Test Town",
      country: "Test Country"
    }

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city)

    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.capital).toEqual('Test Town');
    expect(response.body.country).toEqual('Test Country');
    expect(response.body.created).toBeTruthy();
    expect(response.body.updated).toBeTruthy();
  })

  test('should not allow no capital property', async () => {
    const city = {
      country: 'Test Country',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain('Missing a required value');
  });

  test('should not allow no country property', async () => {
    const city = {
      capital: 'Test Town',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain('Missing a required value');
  });

  test('should not allow empty capital property', async () => {
    const city = {
      capital: '',
      country: 'Test Country',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain('Missing a required value');
  });

  test('should not allow empty country property', async () => {
    const city = {
      capital: 'Test Town',
      country: '',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain('Missing a required value');
  });

  test('should not allow a duplicate city', async() => {
    const city: CityCreateRequest = {
      capital: "Test Town",
      country: "Test Country"
    }

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city)
    
      expect(response.status).toEqual(400);
      expect(response.body.error).toContain('Existing city');
  })
})

describe('PUT Cities endpoint', () => { 


  test('should update a city', async() => {
    const city = {
      capital: 'Test Town POST',
      country: 'Crazy Country POST',
    };

    const postResponse = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city);

    const updateCity = {
      id: postResponse.body.id,
      capital: "Test Town PUT",
      country: "Crazy Country PUT"
    }

    const updateResponse = await request(app)
      .put('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(updateCity);

    expect(updateResponse.status).toEqual(200)
    expect(updateResponse.headers['content-type']).toMatch(/json/);
    expect(updateResponse.body.id).toEqual(updateCity.id);
    expect(updateResponse.body.capital).toEqual('Test Town PUT');
    expect(updateResponse.body.country).toEqual('Crazy Country PUT');
    expect(updateResponse.body.created).toBeTruthy();
    expect(updateResponse.body.updated).toBeTruthy();
  })
})


describe('DELETE cities endpoint', () => {  

  test('should delete the city by id', async () => {
    const city = {
      capital: 'Test Town Delete',
      country: 'Crazy Country Delete',
    };

    const postResponse = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(city);

    const postId = postResponse.body.id;

    const response = await request(app)
      .delete(`/api/cities/${postId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({"message": "City deleted"});
  });
});
