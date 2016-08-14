'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Tipoanotacao = mongoose.model('Tipoanotacao'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, tipoanotacao;

/**
 * Tipoanotacao routes tests
 */
describe('Tipoanotacao CRUD tests', function () {

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

    // Save a user to the test db and create new Tipoanotacao
    user.save(function () {
      tipoanotacao = {
        name: 'Tipoanotacao name'
      };

      done();
    });
  });

  it('should be able to save a Tipoanotacao if logged in', function (done) {
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

        // Save a new Tipoanotacao
        agent.post('/api/tipoanotacaos')
          .send(tipoanotacao)
          .expect(200)
          .end(function (tipoanotacaoSaveErr, tipoanotacaoSaveRes) {
            // Handle Tipoanotacao save error
            if (tipoanotacaoSaveErr) {
              return done(tipoanotacaoSaveErr);
            }

            // Get a list of Tipoanotacaos
            agent.get('/api/tipoanotacaos')
              .end(function (tipoanotacaosGetErr, tipoanotacaosGetRes) {
                // Handle Tipoanotacao save error
                if (tipoanotacaosGetErr) {
                  return done(tipoanotacaosGetErr);
                }

                // Get Tipoanotacaos list
                var tipoanotacaos = tipoanotacaosGetRes.body;

                // Set assertions
                (tipoanotacaos[0].user._id).should.equal(userId);
                (tipoanotacaos[0].name).should.match('Tipoanotacao name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Tipoanotacao if not logged in', function (done) {
    agent.post('/api/tipoanotacaos')
      .send(tipoanotacao)
      .expect(403)
      .end(function (tipoanotacaoSaveErr, tipoanotacaoSaveRes) {
        // Call the assertion callback
        done(tipoanotacaoSaveErr);
      });
  });

  it('should not be able to save an Tipoanotacao if no name is provided', function (done) {
    // Invalidate name field
    tipoanotacao.name = '';

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

        // Save a new Tipoanotacao
        agent.post('/api/tipoanotacaos')
          .send(tipoanotacao)
          .expect(400)
          .end(function (tipoanotacaoSaveErr, tipoanotacaoSaveRes) {
            // Set message assertion
            (tipoanotacaoSaveRes.body.message).should.match('Please fill Tipoanotacao name');

            // Handle Tipoanotacao save error
            done(tipoanotacaoSaveErr);
          });
      });
  });

  it('should be able to update an Tipoanotacao if signed in', function (done) {
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

        // Save a new Tipoanotacao
        agent.post('/api/tipoanotacaos')
          .send(tipoanotacao)
          .expect(200)
          .end(function (tipoanotacaoSaveErr, tipoanotacaoSaveRes) {
            // Handle Tipoanotacao save error
            if (tipoanotacaoSaveErr) {
              return done(tipoanotacaoSaveErr);
            }

            // Update Tipoanotacao name
            tipoanotacao.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Tipoanotacao
            agent.put('/api/tipoanotacaos/' + tipoanotacaoSaveRes.body._id)
              .send(tipoanotacao)
              .expect(200)
              .end(function (tipoanotacaoUpdateErr, tipoanotacaoUpdateRes) {
                // Handle Tipoanotacao update error
                if (tipoanotacaoUpdateErr) {
                  return done(tipoanotacaoUpdateErr);
                }

                // Set assertions
                (tipoanotacaoUpdateRes.body._id).should.equal(tipoanotacaoSaveRes.body._id);
                (tipoanotacaoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Tipoanotacaos if not signed in', function (done) {
    // Create new Tipoanotacao model instance
    var tipoanotacaoObj = new Tipoanotacao(tipoanotacao);

    // Save the tipoanotacao
    tipoanotacaoObj.save(function () {
      // Request Tipoanotacaos
      request(app).get('/api/tipoanotacaos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Tipoanotacao if not signed in', function (done) {
    // Create new Tipoanotacao model instance
    var tipoanotacaoObj = new Tipoanotacao(tipoanotacao);

    // Save the Tipoanotacao
    tipoanotacaoObj.save(function () {
      request(app).get('/api/tipoanotacaos/' + tipoanotacaoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', tipoanotacao.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Tipoanotacao with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/tipoanotacaos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Tipoanotacao is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Tipoanotacao which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Tipoanotacao
    request(app).get('/api/tipoanotacaos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Tipoanotacao with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Tipoanotacao if signed in', function (done) {
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

        // Save a new Tipoanotacao
        agent.post('/api/tipoanotacaos')
          .send(tipoanotacao)
          .expect(200)
          .end(function (tipoanotacaoSaveErr, tipoanotacaoSaveRes) {
            // Handle Tipoanotacao save error
            if (tipoanotacaoSaveErr) {
              return done(tipoanotacaoSaveErr);
            }

            // Delete an existing Tipoanotacao
            agent.delete('/api/tipoanotacaos/' + tipoanotacaoSaveRes.body._id)
              .send(tipoanotacao)
              .expect(200)
              .end(function (tipoanotacaoDeleteErr, tipoanotacaoDeleteRes) {
                // Handle tipoanotacao error error
                if (tipoanotacaoDeleteErr) {
                  return done(tipoanotacaoDeleteErr);
                }

                // Set assertions
                (tipoanotacaoDeleteRes.body._id).should.equal(tipoanotacaoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Tipoanotacao if not signed in', function (done) {
    // Set Tipoanotacao user
    tipoanotacao.user = user;

    // Create new Tipoanotacao model instance
    var tipoanotacaoObj = new Tipoanotacao(tipoanotacao);

    // Save the Tipoanotacao
    tipoanotacaoObj.save(function () {
      // Try deleting Tipoanotacao
      request(app).delete('/api/tipoanotacaos/' + tipoanotacaoObj._id)
        .expect(403)
        .end(function (tipoanotacaoDeleteErr, tipoanotacaoDeleteRes) {
          // Set message assertion
          (tipoanotacaoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Tipoanotacao error error
          done(tipoanotacaoDeleteErr);
        });

    });
  });

  it('should be able to get a single Tipoanotacao that has an orphaned user reference', function (done) {
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

          // Save a new Tipoanotacao
          agent.post('/api/tipoanotacaos')
            .send(tipoanotacao)
            .expect(200)
            .end(function (tipoanotacaoSaveErr, tipoanotacaoSaveRes) {
              // Handle Tipoanotacao save error
              if (tipoanotacaoSaveErr) {
                return done(tipoanotacaoSaveErr);
              }

              // Set assertions on new Tipoanotacao
              (tipoanotacaoSaveRes.body.name).should.equal(tipoanotacao.name);
              should.exist(tipoanotacaoSaveRes.body.user);
              should.equal(tipoanotacaoSaveRes.body.user._id, orphanId);

              // force the Tipoanotacao to have an orphaned user reference
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

                    // Get the Tipoanotacao
                    agent.get('/api/tipoanotacaos/' + tipoanotacaoSaveRes.body._id)
                      .expect(200)
                      .end(function (tipoanotacaoInfoErr, tipoanotacaoInfoRes) {
                        // Handle Tipoanotacao error
                        if (tipoanotacaoInfoErr) {
                          return done(tipoanotacaoInfoErr);
                        }

                        // Set assertions
                        (tipoanotacaoInfoRes.body._id).should.equal(tipoanotacaoSaveRes.body._id);
                        (tipoanotacaoInfoRes.body.name).should.equal(tipoanotacao.name);
                        should.equal(tipoanotacaoInfoRes.body.user, undefined);

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
      Tipoanotacao.remove().exec(done);
    });
  });
});
