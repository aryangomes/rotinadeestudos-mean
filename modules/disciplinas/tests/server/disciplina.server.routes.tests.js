'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Disciplina = mongoose.model('Disciplina'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, disciplina;

/**
 * Disciplina routes tests
 */
describe('Disciplina CRUD tests', function () {

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

    // Save a user to the test db and create new Disciplina
    user.save(function () {
      disciplina = {
        name: 'Disciplina name'
      };

      done();
    });
  });

  it('should be able to save a Disciplina if logged in', function (done) {
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

        // Save a new Disciplina
        agent.post('/api/disciplinas')
          .send(disciplina)
          .expect(200)
          .end(function (disciplinaSaveErr, disciplinaSaveRes) {
            // Handle Disciplina save error
            if (disciplinaSaveErr) {
              return done(disciplinaSaveErr);
            }

            // Get a list of Disciplinas
            agent.get('/api/disciplinas')
              .end(function (disciplinasGetErr, disciplinasGetRes) {
                // Handle Disciplina save error
                if (disciplinasGetErr) {
                  return done(disciplinasGetErr);
                }

                // Get Disciplinas list
                var disciplinas = disciplinasGetRes.body;

                // Set assertions
                (disciplinas[0].user._id).should.equal(userId);
                (disciplinas[0].name).should.match('Disciplina name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Disciplina if not logged in', function (done) {
    agent.post('/api/disciplinas')
      .send(disciplina)
      .expect(403)
      .end(function (disciplinaSaveErr, disciplinaSaveRes) {
        // Call the assertion callback
        done(disciplinaSaveErr);
      });
  });

  it('should not be able to save an Disciplina if no name is provided', function (done) {
    // Invalidate name field
    disciplina.name = '';

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

        // Save a new Disciplina
        agent.post('/api/disciplinas')
          .send(disciplina)
          .expect(400)
          .end(function (disciplinaSaveErr, disciplinaSaveRes) {
            // Set message assertion
            (disciplinaSaveRes.body.message).should.match('Please fill Disciplina name');

            // Handle Disciplina save error
            done(disciplinaSaveErr);
          });
      });
  });

  it('should be able to update an Disciplina if signed in', function (done) {
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

        // Save a new Disciplina
        agent.post('/api/disciplinas')
          .send(disciplina)
          .expect(200)
          .end(function (disciplinaSaveErr, disciplinaSaveRes) {
            // Handle Disciplina save error
            if (disciplinaSaveErr) {
              return done(disciplinaSaveErr);
            }

            // Update Disciplina name
            disciplina.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Disciplina
            agent.put('/api/disciplinas/' + disciplinaSaveRes.body._id)
              .send(disciplina)
              .expect(200)
              .end(function (disciplinaUpdateErr, disciplinaUpdateRes) {
                // Handle Disciplina update error
                if (disciplinaUpdateErr) {
                  return done(disciplinaUpdateErr);
                }

                // Set assertions
                (disciplinaUpdateRes.body._id).should.equal(disciplinaSaveRes.body._id);
                (disciplinaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Disciplinas if not signed in', function (done) {
    // Create new Disciplina model instance
    var disciplinaObj = new Disciplina(disciplina);

    // Save the disciplina
    disciplinaObj.save(function () {
      // Request Disciplinas
      request(app).get('/api/disciplinas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Disciplina if not signed in', function (done) {
    // Create new Disciplina model instance
    var disciplinaObj = new Disciplina(disciplina);

    // Save the Disciplina
    disciplinaObj.save(function () {
      request(app).get('/api/disciplinas/' + disciplinaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', disciplina.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Disciplina with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/disciplinas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Disciplina is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Disciplina which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Disciplina
    request(app).get('/api/disciplinas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Disciplina with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Disciplina if signed in', function (done) {
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

        // Save a new Disciplina
        agent.post('/api/disciplinas')
          .send(disciplina)
          .expect(200)
          .end(function (disciplinaSaveErr, disciplinaSaveRes) {
            // Handle Disciplina save error
            if (disciplinaSaveErr) {
              return done(disciplinaSaveErr);
            }

            // Delete an existing Disciplina
            agent.delete('/api/disciplinas/' + disciplinaSaveRes.body._id)
              .send(disciplina)
              .expect(200)
              .end(function (disciplinaDeleteErr, disciplinaDeleteRes) {
                // Handle disciplina error error
                if (disciplinaDeleteErr) {
                  return done(disciplinaDeleteErr);
                }

                // Set assertions
                (disciplinaDeleteRes.body._id).should.equal(disciplinaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Disciplina if not signed in', function (done) {
    // Set Disciplina user
    disciplina.user = user;

    // Create new Disciplina model instance
    var disciplinaObj = new Disciplina(disciplina);

    // Save the Disciplina
    disciplinaObj.save(function () {
      // Try deleting Disciplina
      request(app).delete('/api/disciplinas/' + disciplinaObj._id)
        .expect(403)
        .end(function (disciplinaDeleteErr, disciplinaDeleteRes) {
          // Set message assertion
          (disciplinaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Disciplina error error
          done(disciplinaDeleteErr);
        });

    });
  });

  it('should be able to get a single Disciplina that has an orphaned user reference', function (done) {
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

          // Save a new Disciplina
          agent.post('/api/disciplinas')
            .send(disciplina)
            .expect(200)
            .end(function (disciplinaSaveErr, disciplinaSaveRes) {
              // Handle Disciplina save error
              if (disciplinaSaveErr) {
                return done(disciplinaSaveErr);
              }

              // Set assertions on new Disciplina
              (disciplinaSaveRes.body.name).should.equal(disciplina.name);
              should.exist(disciplinaSaveRes.body.user);
              should.equal(disciplinaSaveRes.body.user._id, orphanId);

              // force the Disciplina to have an orphaned user reference
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

                    // Get the Disciplina
                    agent.get('/api/disciplinas/' + disciplinaSaveRes.body._id)
                      .expect(200)
                      .end(function (disciplinaInfoErr, disciplinaInfoRes) {
                        // Handle Disciplina error
                        if (disciplinaInfoErr) {
                          return done(disciplinaInfoErr);
                        }

                        // Set assertions
                        (disciplinaInfoRes.body._id).should.equal(disciplinaSaveRes.body._id);
                        (disciplinaInfoRes.body.name).should.equal(disciplina.name);
                        should.equal(disciplinaInfoRes.body.user, undefined);

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
      Disciplina.remove().exec(done);
    });
  });
});
