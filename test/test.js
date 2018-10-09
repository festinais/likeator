const
    request = require('supertest'),
    expect = require('chai').expect;

const
    PORT = 5000,
    HOST = `http://localhost:${PORT}`;

const
    app = require('../server.js').server,
    router = require('../server/routes/routes');

let token;
let userId;

let userName = "";
let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
for (let i = 0; i < 5; i++)
    userName += possible.charAt(Math.floor(Math.random() * possible.length));
let userEmail = userName + '@testme.com'


describe("Liketor endpoint tests", function() {

    //override the mocha timeout in this test to 60 seconds
    this.timeout(60000);

    before(function () {
        app.listen(5000);
    });

    it("Expect a successful signup", function(done){

        request(HOST)
            .post('/signup')
            .send({
                name: userName,
                email: userEmail,
                password: "test123",
            })
            .end(function(err, res){
                expect(res.status).to.equal(200);
                token = res.body.data.token;
                done();
            });
    });

    it("Expect a successful login", function(done){

        request(HOST)
            .post('/login')
            .send({
                email: userEmail,
                password: "test123",
            })
            .end(function(err, res){
                userId = res.body.data.id;
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Expect my profile", function(done){

        request(HOST)
            .post('/me')
            .set({token: token})
            .send({
                email: userEmail
            })
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Expect a successful update password", function(done){

        request(HOST)
            .post('/update-password')
            .set({token: token})
            .send({
                email: userEmail,
                password: "test123",
                newPassword: "test321"
            })
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Expect user information", function(done){

        request(HOST)
            .get('/user/' + userId)
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Expect a successful like", function(done){

        request(HOST)
            .post('/user/' + userId + '/like')
            .set({token: token})
            .send({
                affectedUserEmail: userEmail,
                affectedUserName: userName,
                committedBy: userEmail
            })
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Expect a successful unlike", function(done){

        request(HOST)
            .post('/user/' + userId + '/unlike')
            .set({token: token})
            .send({
                affectedUserEmail: userEmail,
                affectedUserName: userName,
                committedBy: userEmail
            })
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Expect a successful most liked response", function(done){

        request(HOST)
            .get('/most-liked')
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});