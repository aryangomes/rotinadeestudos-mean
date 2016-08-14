'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Anotacao = mongoose.model('Anotacao'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, anotacao;

/**
 * Anotacao routes tests
 */
describe('Anotacao CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Anotacao
    user.save(function () {
      anotacao = {
        name: 'Anotacao name'
      };

      done();
    });
  });

  it('should be able to save a Anotacao if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Anotacao
        agent.post('/api/anotacaos')
          .send(anotacao)
          .expect(200)
          .end(function (anotacaoSaveErr, anotacaoSaveRes) {
            // Handle Anotacao save error
            if (anotacaoSaveErr) {
              return done(anotacaoSaveErr);
            }

            // Get a list of Anotacaos
            agent.get('/api/anotacaos')
              .end(function (anotacaosGetErr, anotacaosGetRes) {
                // Handle Anotacao save error
                if (anotacaosGetErr) {
                  return done(anotacaosGetErr);
                }

                // Get Anotacaos list
                var anotacaos = anotacaosGetRes.body;

                // Set assertions
                (anotacaos[0].user._id).should.equal(userId);
                (anotacaos[0].name).should.match('Anotacao name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Anotacao if not logged in', function (done) {
    agent.post('/api/anotacaos')
      .send(anotacao)
      .expect(403)
      .end(function (anotacaoSaveErr, anotacaoSaveRes) {
        // Call the assertion callback
        done(anotacaoSaveErr);
      });
  });

  it('should not be able to save an Anotacao if no name is provided', function (done) {
    // Invalidate name field
    anotacao.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Anotacao
        agent.post('/api/anotacaos')
          .send(anotacao)
          .expect(400)
          .end(function (anotacaoSaveErr, anotacaoSaveRes) {
            // Set message assertion
            (anotacaoSaveRes.body.message).should.match('Please fill Anotacao name');

            // Handle Anotacao save error
            done(anotacaoSaveErr);
          });
      });
  });

  it('should be able to update an Anotacao if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Anotacao
        agent.post('/api/anotacaos')
          .send(anotacao)
          .expect(200)
          .end(function (anotacaoSaveErr, anotacaoSaveRes) {
            // Handle Anotacao save error
            if (anotacaoSaveErr) {
              return done(anotacaoSaveErr);
            }

            // Update Anotacao name
            anotacao.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Anotacao
            agent.put('/api/anotacaos/' + anotacaoSaveRes.body._id)
              .send(anotacao)
              .expect(200)
              .end(function (anotacaoUpdateErr, anotacaoUpdateRes) {
                // Handle Anotacao update error
                if (anotacaoUpdateErr) {
                  return done(anotacaoUpdateErr);
                }

                // Set assertions
                (anotacaoUpdateRes.body._id).should.equal(anotacaoSaveRes.body._id);
                (anotacaoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Anotacaos if not signed in', function (done) {
    // Create new Anotacao model instance
    var anotacaoObj = new Anotacao(anotacao);

    // Save the anotacao
    anotacaoObj.save(function () {
      // Request Anotacaos
      request(app).get('/api/anotacaos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Anotacao if not signed in', function (done) {
    // Create new Anotacao model instance
    var anotacaoObj = new Anotacao(anotacao);

    // Save the Anotacao
    anotacaoObj.save(function () {
      request(app).get('/api/anotacaos/' + anotacaoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', anotacao.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Anotacao with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/anotacaos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Anotacao is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Anotacao which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Anotacao
    request(app).get('/api/anotacaos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Anotacao with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Anotacao if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Anotacao
        agent.post('/api/anotacaos')
          .send(anotacao)
          .expect(200)
          .end(function (anotacaoSaveErr, anotacaoSaveRes) {
            // Handle Anotacao save error
            if (anotacaoSaveErr) {
              return done(anotacaoSaveErr);
            }

            // Delete an existing Anotacao
            agent.delete('/api/anotacaos/' + anotacaoSaveRes.body._id)
              .send(anotacao)
              .expect(200)
              .end(function (anotacaoDeleteErr, anotacaoDeleteRes) {
                // Handle anotacao error error
                if (anotacaoDeleteErr) {
                  return done(anotacaoDeleteErr);
                }

                // Set assertions
                (anotacaoDeleteRes.body._id).should.equal(anotacaoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Anotacao if not signed in', function (done) {
    // Set Anotacao user
    anotacao.user = user;

    // Create new Anotacao model instance
    var anotacaoObj = new Anotacao(anotacao);

    // Save the Anotacao
    anotacaoObj.save(function () {
      // Try deleting Anotacao
      request(app).delete('/api/anotacaos/' + anotacaoObj._id)
        .expect(403)
        .end(function (anotacaoDeleteErr, anotacaoDeleteRes) {
          // Set message assertion
          (anotacaoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Anotacao error error
          done(anotacaoDeleteErr);
        });

    });
  });

  it('should be able to get a single Anotacao that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Anotacao
          agent.post('/api/anotacaos')
            .send(anotacao)
            .expect(200)
            .end(function (anotacaoSaveErr, anotacaoSaveRes) {
              // Handle Anotacao save error
              if (anotacaoSaveErr) {
                return done(anotacaoSaveErr);
              }

              // Set assertions on new Anotacao
              (anotacaoSaveRes.body.name).should.equal(anotacao.name);
              should.exist(anotacaoSaveRes.body.user);
              should.equal(anotacaoSaveRes.body.user._id, orphanId);

              // force the Anotacao to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Anotacao
                    agent.get('/api/anotacaos/' + anotacaoSaveRes.body._id)
                      .expect(200)
                      .end(function (anotacaoInfoErr, anotacaoInfoRes) {
                        // Handle Anotacao error
                        if (anotacaoInfoErr) {
                          return done(anotacaoInfoErr);
                        }

                        // Set assertions
                        (anotacaoInfoRes.body._id).should.equal(anotacaoSaveRes.body._id);
                        (anotacaoInfoRes.body.name).should.equal(anotacao.name);
                        should.equal(anotacaoInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Anotacao.remove().exec(done);
    });
  });
});
