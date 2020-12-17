'use strict'

require('../db/config')
const {users} = require('../db/models');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');


describe('api/users', () => {

    describe('Test users exist', () => {
        it('Should not return undefined', () => {
            expect(users).to.not.equal(undefined)
        })
    })

    describe('GET USERS', () => {
        it('Should return 401', async () => {
            const res = await request(app).get('/api/users');
            expect(res.status).to.equal(401);
        })
    })
})

