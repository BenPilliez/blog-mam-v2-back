const {isEmpty, checkProperty} = require("../helpers/checkBody");
const expect = require("chai").expect;

describe("checkBody ", () => {
    before(() => {
        expect(isEmpty).to.be.a("function");
        expect(checkProperty).to.be.a("function");
    });

    describe("test isEmpty", () => {
        it("Should return true", async () => {
            const body = {};
            const res = await isEmpty(body);
            expect(res).to.be.equal(true);
        });

        it("Should return error", () => {
            const res = isEmpty();
            expect(res).to.be.equal("Object can't be null or undefined");
        });

        it("Should return false", () => {
            const body = {username: "test"};
            const res = isEmpty(body);
            expect(res).to.equal(false)
            ;
        });

        describe("checkProperty", () => {
            it("Should return empty object", () => {
                const body = {};
                const res = checkProperty(body, "aze");
                expect(res).to.be.equal("Object can't be null or undefined");
            });

            it("Should return can't be null, empty or null", () => {
                const body = {username: "test"};
                const res = checkProperty(body);
                expect(res).to.be.equal("Property can't be blank, null or empty");
            });

            it("Should return false", () => {
                const body = {username: "test"};
                const property = "username";
                const res = checkProperty(body, property);
                expect(res).to.be.equal(false);
            });

            it("Should return array", () => {

                const body = {username: "test"};
                const property = "password";
                const res = checkProperty(body, property);
                expect(res).to.be.equal(true);
            });
        });
    });
});
