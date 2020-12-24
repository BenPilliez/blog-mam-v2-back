"use strict";
require("../db/config");
const {users} = require("../db/models");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");


describe("api/auth", () => {

    describe("test auth", () => {
        it("auth failed", async () => {
            const user = {email: "test", password: "test"};
            const res = await request(app).post("/api/signin")
                .send(user);

            expect(res.status).to.be.equal(401);
            expect(res.body.error).to.equal("Utilisateur ou mot de passe incorrect");

        });

        it("auth success", async () => {
            const user = {email: "madeleine.f@live.fr", password: "ClemBen59."};
            expect(user).not.to.be.equal(null);
            const res = await request(app).post("/api/signin")
                .send(user);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property("token");
            expect(res.body.token).to.be.a("string");
            expect(res.body).to.have.property("user");
            expect(res.body.user).to.be.a("object");
        });
    });

    describe("Signup state", () => {
        it("signup failed body empty", async () => {
            const user = {};
            const res = await request(app).post("/api/signup")
                .send(user);
            expect(res.status).to.be.equal(400);
        });
        it("signup failed")
    });
});
