'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Repeticaonotificacaoanotacao = mongoose.model('Repeticaonotificacaoanotacao'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, repeticaonotificacaoanotacao;

/**
 * Repeticaonotificacaoanotacao routes tests
 */
describe('Repeticaonotificacaoanotacao CRUD tests', function () {

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

    // Save a user to the test db and create new Repeticaonotificacaoanotacao
    user.save(function () {
      repeticaonotificacaoanotacao = {
        name: 'Repeticaonotificacaoanotacao name'
      };

      done();
    });
  });

  it('should be able to save a Repeticaonotificacaoanotacao if logged in', function (done) {
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

        // Save a new Repeticaonotificacaoanotacao
        agent.post('/api/repeticaonotificacaoanotacaos')
          .send(repeticaonotificacaoanotacao)
          .expect(200)
          .end(function (repeticaonotificacaoanotacaoSaveErr, repeticaonotificacaoanotacaoSaveRes) {
            // Handle Repeticaonotificacaoanotacao save error
            if (repeticaonotificacaoanotacaoSaveErr) {
              return done(repeticaonotificacaoanotacaoSaveErr);
            }

            // Get a list of Repeticaonotificacaoanotacaos
            agent.get('/api/repeticaonotificacaoanotacaos')
              .end(function (repeticaonotificacaoanotacaosGetErr, repeticaonotificacaoanotacaosGetRes) {
                // Handle Repeticaonotificacaoanotacao save error
                if (repeticaonotificacaoanotacaosGetErr) {
                  return done(repeticaonotificacaoanotacaosGetErr);
                }

                // Get Repeticaonotificacaoanotacaos list
                var repeticaonotificacaoanotacaos = repeticaonotificacaoanotacaosGetRes.body;

                // Set assertions
                (repeticaonotificacaoanotacaos[0].user._id).should.equal(userId);
                (repeticaonotificacaoanotacaos[0].name).should.match('Repeticaonotificacaoanotacao name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Repeticaonotificacaoanotacao if not logged in', function (done) {
    agent.post('/api/repeticaonotificacaoanotacaos')
      .send(repeticaonotificacaoanotacao)
      .expect(403)
      .end(function (repeticaonotificacaoanotacaoSaveErr, repeticaonotificacaoanotacaoSaveRes) {
        // Call the assertion callback
        done(repeticaonotificacaoanotacaoSaveErr);
      });
  });

  it('should not be able to save an Repeticaonotificacaoanotacao if no name is provided', function (done) {
    // Invalidate name field
    repeticaonotificacaoanotacao.name = '';

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

        // Save a new Repeticaonotificacaoanotacao
        agent.post('/api/repeticaonotificacaoanotacaos')
          .send(repeticaonotificacaoanotacao)
          .expect(400)
          .end(function (repeticaonotificacaoanotacaoSaveErr, repeticaonotificacaoanotacaoSaveRes) {
            // Set message assertion
            (repeticaonotificacaoanotacaoSaveRes.body.message).should.match('Please fill Repeticaonotificacaoanotacao name');

            // Handle Repeticaonotificacaoanotacao save error
            done(repeticaonotificacaoanotacaoSaveErr);
          });
      });
  });

  it('should be able to update an Repeticaonotificacaoanotacao if signed in', function (done) {
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

        // Save a new Repeticaonotificacaoanotacao
        agent.post('/api/repeticaonotificacaoanotacaos')
          .send(repeticaonotificacaoanotacao)
          .expect(200)
          .end(function (repeticaonotificacaoanotacaoSaveErr, repeticaonotificacaoanotacaoSaveRes) {
            // Handle Repeticaonotificacaoanotacao save error
            if (repeticaonotificacaoanotacaoSaveErr) {
              return done(repeticaonotificacaoanotacaoSaveErr);
            }

            // Update Repeticaonotificacaoanotacao name
            repeticaonotificacaoanotacao.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Repeticaonotificacaoanotacao
            agent.put('/api/repeticaonotificacaoanotacaos/' + repeticaonotificacaoanotacaoSaveRes.body._id)
              .send(repeticaonotificacaoanotacao)
              .expect(200)
              .end(function (repeticaonotificacaoanotacaoUpdateErr, repeticaonotificacaoanotacaoUpdateRes) {
                // Handle Repeticaonotificacaoanotacao update error
                if (repeticaonotificacaoanotacaoUpdateErr) {
                  return done(repeticaonotificacaoanotacaoUpdateErr);
                }

                // Set assertions
                (repeticaonotificacaoanotacaoUpdateRes.body._id).should.equal(repeticaonotificacaoanotacaoSaveRes.body._id);
                (repeticaonotificacaoanotacaoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Repeticaonotificacaoanotacaos if not signed in', function (done) {
    // Create new Repeticaonotificacaoanotacao model instance
    var repeticaonotificacaoanotacaoObj = new Repeticaonotificacaoanotacao(repeticaonotificacaoanotacao);

    // Save the repeticaonotificacaoanotacao
    repeticaonotificacaoanotacaoObj.save(function () {
      // Request Repeticaonotificacaoanotacaos
      request(app).get('/api/repeticaonotificacaoanotacaos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Repeticaonotificacaoanotacao if not signed in', function (done) {
    // Create new Repeticaonotificacaoanotacao model instance
    var repeticaonotificacaoanotacaoObj = new Repeticaonotificacaoanotacao(repeticaonotificacaoanotacao);

    // Save the Repeticaonotificacaoanotacao
    repeticaonotificacaoanotacaoObj.save(function () {
      request(app).get('/api/repeticaonotificacaoanotacaos/' + repeticaonotificacaoanotacaoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', repeticaonotificacaoanotacao.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Repeticaonotificacaoanotacao with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/repeticaonotificacaoanotacaos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Repeticaonotificacaoanotacao is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Repeticaonotificacaoanotacao which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Repeticaonotificacaoanotacao
    request(app).get('/api/repeticaonotificacaoanotacaos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Repeticaonotificacaoanotacao with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Repeticaonotificacaoanotacao if signed in', function (done) {
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

        // Save a new Repeticaonotificacaoanotacao
        agent.post('/api/repeticaonotificacaoanotacaos')
          .send(repeticaonotificacaoanotacao)
          .expect(200)
          .end(function (repeticaonotificacaoanotacaoSaveErr, repeticaonotificacaoanotacaoSaveRes) {
            // Handle Repeticaonotificacaoanotacao save error
            if (repeticaonotificacaoanotacaoSaveErr) {
              return done(repeticaonotificacaoanotacaoSaveErr);
            }

            // Delete an existing Repeticaonotificacaoanotacao
            agent.delete('/api/repeticaonotificacaoanotacaos/' + repeticaonotificacaoanotacaoSaveRes.body._id)
              .send(repeticaonotificacaoanotacao)
              .expect(200)
              .end(function (repeticaonotificacaoanotacaoDeleteErr, repeticaonotificacaoanotacaoDeleteRes) {
                // Handle repeticaonotificacaoanotacao error error
                if (repeticaonotificacaoanotacaoDeleteErr) {
                  return done(repeticaonotificacaoanotacaoDeleteErr);
                }

                // Set assertions
                (repeticaonotificacaoanotacaoDeleteRes.body._id).should.equal(repeticaonotificacaoanotacaoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Repeticaonotificacaoanotacao if not signed in', function (done) {
    // Set Repeticaonotificacaoanotacao user
    repeticaonotificacaoanotacao.user = user;

    // Create new Repeticaonotificacaoanotacao model instance
    var repeticaonotificacaoanotacaoObj = new Repeticaonotificacaoanotacao(repeticaonotificacaoanotacao);

    // Save the Repeticaonotificacaoanotacao
    repeticaonotificacaoanotacaoObj.save(function () {
      // Try deleting Repeticaonotificacaoanotacao
      request(app).delete('/api/repeticaonotificacaoanotacaos/' + repeticaonotificacaoanotacaoObj._id)
        .expect(403)
        .end(function (repeticaonotificacaoanotacaoDeleteErr, repeticaonotificacaoanotacaoDeleteRes) {
          // Set message assertion
          (repeticaonotificacaoanotacaoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Repeticaonotificacaoanotacao error error
          done(repeticaonotificacaoanotacaoDeleteErr);
        });

    });
  });

  it('should be able to get a single Repeticaonotificacaoanotacao that has an orphaned user reference', function (done) {
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

          // Save a new Repeticaonotificacaoanotacao
          agent.post('/api/repeticaonotificacaoanotacaos')
            .send(repeticaonotificacaoanotacao)
            .expect(200)
            .end(function (repeticaonotificacaoanotacaoSaveErr, repeticaonotificacaoanotacaoSaveRes) {
              // Handle Repeticaonotificacaoanotacao save error
              if (repeticaonotificacaoanotacaoSaveErr) {
                return done(repeticaonotificacaoanotacaoSaveErr);
              }

              // Set assertions on new Repeticaonotificacaoanotacao
              (repeticaonotificacaoanotacaoSaveRes.body.name).should.equal(repeticaonotificacaoanotacao.name);
              should.exist(repeticaonotificacaoanotacaoSaveRes.body.user);
              should.equal(repeticaonotificacaoanotacaoSaveRes.body.user._id, orphanId);

              // force the Repeticaonotificacaoanotacao to have an orphaned user reference
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

                    // Get the Repeticaonotificacaoanotacao
                    agent.get('/api/repeticaonotificacaoanotacaos/' + repeticaonotificacaoanotacaoSaveRes.body._id)
                      .expect(200)
                      .end(function (repeticaonotificacaoanotacaoInfoErr, repeticaonotificacaoanotacaoInfoRes) {
                        // Handle Repeticaonotificacaoanotacao error
                        if (repeticaonotificacaoanotacaoInfoErr) {
                          return done(repeticaonotificacaoanotacaoInfoErr);
                        }

                        // Set assertions
                        (repeticaonotificacaoanotacaoInfoRes.body._id).should.equal(repeticaonotificacaoanotacaoSaveRes.body._id);
                        (repeticaonotificacaoanotacaoInfoRes.body.name).should.equal(repeticaonotificacaoanotacao.name);
                        should.equal(repeticaonotificacaoanotacaoInfoRes.body.user, undefined);

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
      Repeticaonotificacaoanotacao.remove().exec(done);
    });
  });
});
