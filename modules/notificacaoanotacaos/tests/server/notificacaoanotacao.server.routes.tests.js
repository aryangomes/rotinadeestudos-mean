'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Notificacaoanotacao = mongoose.model('Notificacaoanotacao'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, notificacaoanotacao;

/**
 * Notificacaoanotacao routes tests
 */
describe('Notificacaoanotacao CRUD tests', function () {

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

    // Save a user to the test db and create new Notificacaoanotacao
    user.save(function () {
      notificacaoanotacao = {
        name: 'Notificacaoanotacao name'
      };

      done();
    });
  });

  it('should be able to save a Notificacaoanotacao if logged in', function (done) {
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

        // Save a new Notificacaoanotacao
        agent.post('/api/notificacaoanotacaos')
          .send(notificacaoanotacao)
          .expect(200)
          .end(function (notificacaoanotacaoSaveErr, notificacaoanotacaoSaveRes) {
            // Handle Notificacaoanotacao save error
            if (notificacaoanotacaoSaveErr) {
              return done(notificacaoanotacaoSaveErr);
            }

            // Get a list of Notificacaoanotacaos
            agent.get('/api/notificacaoanotacaos')
              .end(function (notificacaoanotacaosGetErr, notificacaoanotacaosGetRes) {
                // Handle Notificacaoanotacao save error
                if (notificacaoanotacaosGetErr) {
                  return done(notificacaoanotacaosGetErr);
                }

                // Get Notificacaoanotacaos list
                var notificacaoanotacaos = notificacaoanotacaosGetRes.body;

                // Set assertions
                (notificacaoanotacaos[0].user._id).should.equal(userId);
                (notificacaoanotacaos[0].name).should.match('Notificacaoanotacao name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Notificacaoanotacao if not logged in', function (done) {
    agent.post('/api/notificacaoanotacaos')
      .send(notificacaoanotacao)
      .expect(403)
      .end(function (notificacaoanotacaoSaveErr, notificacaoanotacaoSaveRes) {
        // Call the assertion callback
        done(notificacaoanotacaoSaveErr);
      });
  });

  it('should not be able to save an Notificacaoanotacao if no name is provided', function (done) {
    // Invalidate name field
    notificacaoanotacao.name = '';

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

        // Save a new Notificacaoanotacao
        agent.post('/api/notificacaoanotacaos')
          .send(notificacaoanotacao)
          .expect(400)
          .end(function (notificacaoanotacaoSaveErr, notificacaoanotacaoSaveRes) {
            // Set message assertion
            (notificacaoanotacaoSaveRes.body.message).should.match('Please fill Notificacaoanotacao name');

            // Handle Notificacaoanotacao save error
            done(notificacaoanotacaoSaveErr);
          });
      });
  });

  it('should be able to update an Notificacaoanotacao if signed in', function (done) {
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

        // Save a new Notificacaoanotacao
        agent.post('/api/notificacaoanotacaos')
          .send(notificacaoanotacao)
          .expect(200)
          .end(function (notificacaoanotacaoSaveErr, notificacaoanotacaoSaveRes) {
            // Handle Notificacaoanotacao save error
            if (notificacaoanotacaoSaveErr) {
              return done(notificacaoanotacaoSaveErr);
            }

            // Update Notificacaoanotacao name
            notificacaoanotacao.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Notificacaoanotacao
            agent.put('/api/notificacaoanotacaos/' + notificacaoanotacaoSaveRes.body._id)
              .send(notificacaoanotacao)
              .expect(200)
              .end(function (notificacaoanotacaoUpdateErr, notificacaoanotacaoUpdateRes) {
                // Handle Notificacaoanotacao update error
                if (notificacaoanotacaoUpdateErr) {
                  return done(notificacaoanotacaoUpdateErr);
                }

                // Set assertions
                (notificacaoanotacaoUpdateRes.body._id).should.equal(notificacaoanotacaoSaveRes.body._id);
                (notificacaoanotacaoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Notificacaoanotacaos if not signed in', function (done) {
    // Create new Notificacaoanotacao model instance
    var notificacaoanotacaoObj = new Notificacaoanotacao(notificacaoanotacao);

    // Save the notificacaoanotacao
    notificacaoanotacaoObj.save(function () {
      // Request Notificacaoanotacaos
      request(app).get('/api/notificacaoanotacaos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Notificacaoanotacao if not signed in', function (done) {
    // Create new Notificacaoanotacao model instance
    var notificacaoanotacaoObj = new Notificacaoanotacao(notificacaoanotacao);

    // Save the Notificacaoanotacao
    notificacaoanotacaoObj.save(function () {
      request(app).get('/api/notificacaoanotacaos/' + notificacaoanotacaoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', notificacaoanotacao.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Notificacaoanotacao with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/notificacaoanotacaos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Notificacaoanotacao is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Notificacaoanotacao which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Notificacaoanotacao
    request(app).get('/api/notificacaoanotacaos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Notificacaoanotacao with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Notificacaoanotacao if signed in', function (done) {
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

        // Save a new Notificacaoanotacao
        agent.post('/api/notificacaoanotacaos')
          .send(notificacaoanotacao)
          .expect(200)
          .end(function (notificacaoanotacaoSaveErr, notificacaoanotacaoSaveRes) {
            // Handle Notificacaoanotacao save error
            if (notificacaoanotacaoSaveErr) {
              return done(notificacaoanotacaoSaveErr);
            }

            // Delete an existing Notificacaoanotacao
            agent.delete('/api/notificacaoanotacaos/' + notificacaoanotacaoSaveRes.body._id)
              .send(notificacaoanotacao)
              .expect(200)
              .end(function (notificacaoanotacaoDeleteErr, notificacaoanotacaoDeleteRes) {
                // Handle notificacaoanotacao error error
                if (notificacaoanotacaoDeleteErr) {
                  return done(notificacaoanotacaoDeleteErr);
                }

                // Set assertions
                (notificacaoanotacaoDeleteRes.body._id).should.equal(notificacaoanotacaoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Notificacaoanotacao if not signed in', function (done) {
    // Set Notificacaoanotacao user
    notificacaoanotacao.user = user;

    // Create new Notificacaoanotacao model instance
    var notificacaoanotacaoObj = new Notificacaoanotacao(notificacaoanotacao);

    // Save the Notificacaoanotacao
    notificacaoanotacaoObj.save(function () {
      // Try deleting Notificacaoanotacao
      request(app).delete('/api/notificacaoanotacaos/' + notificacaoanotacaoObj._id)
        .expect(403)
        .end(function (notificacaoanotacaoDeleteErr, notificacaoanotacaoDeleteRes) {
          // Set message assertion
          (notificacaoanotacaoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Notificacaoanotacao error error
          done(notificacaoanotacaoDeleteErr);
        });

    });
  });

  it('should be able to get a single Notificacaoanotacao that has an orphaned user reference', function (done) {
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

          // Save a new Notificacaoanotacao
          agent.post('/api/notificacaoanotacaos')
            .send(notificacaoanotacao)
            .expect(200)
            .end(function (notificacaoanotacaoSaveErr, notificacaoanotacaoSaveRes) {
              // Handle Notificacaoanotacao save error
              if (notificacaoanotacaoSaveErr) {
                return done(notificacaoanotacaoSaveErr);
              }

              // Set assertions on new Notificacaoanotacao
              (notificacaoanotacaoSaveRes.body.name).should.equal(notificacaoanotacao.name);
              should.exist(notificacaoanotacaoSaveRes.body.user);
              should.equal(notificacaoanotacaoSaveRes.body.user._id, orphanId);

              // force the Notificacaoanotacao to have an orphaned user reference
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

                    // Get the Notificacaoanotacao
                    agent.get('/api/notificacaoanotacaos/' + notificacaoanotacaoSaveRes.body._id)
                      .expect(200)
                      .end(function (notificacaoanotacaoInfoErr, notificacaoanotacaoInfoRes) {
                        // Handle Notificacaoanotacao error
                        if (notificacaoanotacaoInfoErr) {
                          return done(notificacaoanotacaoInfoErr);
                        }

                        // Set assertions
                        (notificacaoanotacaoInfoRes.body._id).should.equal(notificacaoanotacaoSaveRes.body._id);
                        (notificacaoanotacaoInfoRes.body.name).should.equal(notificacaoanotacao.name);
                        should.equal(notificacaoanotacaoInfoRes.body.user, undefined);

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
      Notificacaoanotacao.remove().exec(done);
    });
  });
});
