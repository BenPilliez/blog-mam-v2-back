"use strict";

require("../db/config");
const {users} = require("../db/models");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");

let token;

describe("api/users", () => {

    beforeEach(async () => {
        let res = await request(app)
            .post("/api/signin")
            .send({email: "lalala@test.fr", password: "Fifa2012@@"});

        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.be.a("object");

        token = res.body.token;

    });

    describe("Test users exist", () => {
        it("Should not return undefined", () => {
            expect(users).to.not.equal(undefined);
        });
    });

    describe("GET USERS", () => {
        it("Should return 401", async () => {
            const res = await request(app).get("/api/users").set("Authorization", `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });

    describe("GET DETAIL USERS", () => {
        it("SHOULD RETURN 401", async () => {
            const res = await request(app).get("/api/users/1").set("Authorization", `Bearer ${token}`);
            expect(res.status).to.equal(401);
        });

        it("SHOULD RETURN 200", async () => {
            const res = await request(app).get("/api/users/42").set("Authorization", `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.have.property("ROLES");
            expect(res.body).to.have.property("createdAt");
            expect(res.body).to.have.property("username");
            expect(res.body).to.have.property("email");
            expect(res.body).to.have.property("avatar");
            expect(res.body).to.have.property("id");
        });

        it("SHOULD RETURN 401", async () => {
            const res = await request(app).put("/api/users/1").set("Authorization", `Bearer ${token}`).send({username: "ALLO"});
            expect(res.status).to.equal(401);
        });

        it("SHOULD RETURN 200", async () => {
            const res = await request(app).put("/api/users/42").set("Authorization", `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });

        it("SHOULD RETURN 401 password", async () => {
            const res = await request(app).put("/api/users/password/1").set("Authorization", `Bearer ${token}`);
            expect(res.status).to.equal(401);
        });

        it("SHOULD RETURN 400 Le formulaire ne peut être vide", async () => {
            const res = await request(app).put("/api/users/password/42").set("Authorization", `Bearer ${token}`);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.be.a("string");
            expect(res.body.error).to.equal("Le formulaire ne peut être vide");
        });

        it("SHOULD RETURN 400, il manque le champ password", async () => {
            const res = await request(app).put("/api/users/password/42").set("Authorization", `Bearer ${token}`).send({
                oldPassword: "Fifa2012@@",
            });
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.be.a("string");
            expect(res.body.error).to.equal("Il me faut un nouveau mot de passe");
        });

        it("SHOULD RETURN 200", async () => {
            const res = await request(app).put("/api/users/password/42").set("Authorization", `Bearer ${token}`).send({
                oldPassword: "Fifa2012@@",
                password: "Fifa2012@@"
            });
            expect(res.status).to.equal(200);
        });
    });
});

