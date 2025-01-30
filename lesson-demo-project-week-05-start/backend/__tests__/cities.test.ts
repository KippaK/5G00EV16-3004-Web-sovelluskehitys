import { describe, expect, test } from "@jest/globals";
import request from "supertest";

import app from '../src/app'
import { CityCreateRequest } from "../src/models/cities";
import exp from "constants";

describe('GET Cities endpoint', () => {

    test('should return 200', (done) => {
        request(app)
            .get('/api/cities')
            .expect(200)
            .end(done)
    })

	test('should return 200 and valid JSON', async () => {
		const response = await request(app)
			.get('/api/cities')
			.set('Accept', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 1,
					capital: 'Oslo',
					country: 'Norway',
				}),
				expect.objectContaining({
					id: 2,
					capital: 'Pretoria',
					country: 'South Africa',
				}),
				expect.objectContaining({
					id: 3,
					capital: 'Helsinki',
					country: 'Finland',
				}),
			]),

		);
	});

    test('should retrun 404 and not found', async() => {
        const response = await request(app)
			.get('/api/cities/202')
			.set('Accept', 'application/json');

        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ message: "City not found" });
    })
})

describe('POST Cities endpoint', () => {
    test('should create a new city', async() => {
        const city: CityCreateRequest = {
            capital: "Test town",
            country: "Test country"
        }

        const response = await request(app)
            .post('/api/cities')
            .set('Accept', 'application/json')
            .set('Content', 'application/json')
            .send(city)
          
        expect(response.status).toEqual(200)

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.id).toBeTruthy();
        expect(response.body.capital).toEqual('Test town');
        expect(response.body.country).toEqual('Test country');
        expect(response.body.created).toBeTruthy()
        expect(response.body.updated).toBeTruthy()
    })

    test('should not allow no capital property', async () => {
        const city = {
            country: 'Test country'
        };
        const response = await request(app)
            .post('/api/cities')
            .set('Accept', 'application/json')
            .send(city)

        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('Missing a required value')
    })

    test('should not allow no country property', async () => {
        const city = {
            capital: 'Test capital'
        };
        const response = await request(app)
            .post('/api/cities')
            .set('Accept', 'application/json')
            .send(city)

        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('Missing a required value')
    })

    test('should not allow empty capital property', async () => {
        const city = {
            capital: '',
            country: 'Test country'
        };
        const response = await request(app)
            .post('/api/cities')
            .set('Accept', 'application/json')
            .send(city)

        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('Missing a required value')
    })

    test('should not allow empty country property', async () => {
        const city = {
            capital: 'Test capital',
            country: ''
        };
        const response = await request(app)
            .post('/api/cities')
            .set('Accept', 'application/json')
            .send(city)

        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('Missing a required value')
    })
})