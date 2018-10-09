const
    request = require('supertest'),
    expect = require('chai').expect;


const
    PORT = 8000,
    HOST = `http://localhost:${PORT}`;

const app = require('../server.js').server,
    router = require('../server/routes/routes');

describe("Liketor endpoint tests", function() {

    //override the mocha timeout in this test to 60 seconds
    this.timeout(60000);

    it("Expect a Forbiden message", function(done){

        request(HOST)
            .post('/me')
            .send({
                email: "blla@blla.com"
            })
            .expect(403, done);
    })

    it("Expect a 200 message", function(done){

        request(HOST)
            .post('/me')
            .set({ token: "eyJhb444GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYmI4NTc1YmNkYzg3ODA0YThiOTdlOCIsImlhdCI6MTUzOTAxNjA1MywiZXhwIjoxNTM5MTAyNDUzfQ.wTBnZyIF7vwnS3gsRtD0FMryq7BNGoAxykxAXOYwuio" })
            .send({
                email: "festina@festina.com"
            })
            .expect(200, done);
    })
});