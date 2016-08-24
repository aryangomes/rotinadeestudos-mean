'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Atividadediarium = mongoose.model('Atividadediarium'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, atividadediarium;

/**
 * Atividadediarium routes tests
 */
describe('Atividadediarium CRUD tests', function () {

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

    // Save a user to the test db and create new Atividadediarium
    user.save(function () {
      atividadediarium = {
        name: 'Atividadediarium name'
      };

      done();
    });
  });

  it('should be able to save a Atividadediarium if logged in', function (done) {
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

        // Save a new Atividadediarium
        agent.post('/api/atividadediaria')
          .send(atividadediarium)
          .expect(200)
          .end(function (atividadediariumSaveErr, atividadediariumSaveRes) {
            // Handle Atividadediarium save error
            if (atividadediariumSaveErr) {
              return done(atividadediariumSaveErr);
            }

            // Get a list of Atividadediaria
            agent.get('/api/atividadediaria')
              .end(function (atividadediariumsGetErr, atividadediariumsGetRes) {
                // Handle Atividadediarium save error
                if (atividadediariumsGetErr) {
                  return done(atividadediariumsGetErr);
                }

                // Get Atividadediaria list
                var atividadediaria = atividadediariaGetRes.body;

                // Set assertions
                (atividadediaria[0].user._id).should.equal(userId);
                (atividadediaria[0].name).should.match('Atividadediarium name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Atividadediarium if not logged in', function (done) {
    agent.post('/api/atividadediaria')
      .send(atividadediarium)
      .expect(403)
      .end(function (atividadediariumSaveErr, atividadediariumSaveRes) {
        // Call the assertion callback
        done(atividadediariumSaveErr);
      });
  });

  it('should not be able to save an Atividadediarium if no name is provided', function (done) {
    // Invalidate name field
    atividadediarium.name = '';

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

        // Save a new Atividadediarium
        agent.post('/api/atividadediaria')
          .send(atividadediarium)
          .expect(400)
          .end(function (atividadediariumSaveErr, atividadediariumSaveRes) {
            // Set message assertion
            (atividadediariumSaveRes.body.message).should.match('Please fill Atividadediarium name');

            // Handle Atividadediarium save error
            done(atividadediariumSaveErr);
          });
      });
  });

  it('should be able to update an Atividadediarium if signed in', function (done) {
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

        // Save a new Atividadediarium
        agent.post('/api/atividadediaria')
          .send(atividadediarium)
          .expect(200)
          .end(function (atividadediariumSaveErr, atividadediariumSaveRes) {
            // Handle Atividadediarium save error
            if (atividadediariumSaveErr) {
              return done(atividadediariumSaveErr);
            }

            // Update Atividadediarium name
            atividadediarium.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Atividadediarium
            agent.put('/api/atividadediaria/' + atividadediariumSaveRes.body._id)
              .send(atividadediarium)
              .expect(200)
              .end(function (atividadediariumUpdateErr, atividadediariumUpdateRes) {
                // Handle Atividadediarium update error
                if (atividadediariumUpdateErr) {
                  return done(atividadediariumUpdateErr);
                }

                // Set assertions
                (atividadediariumUpdateRes.body._id).should.equal(atividadediariumSaveRes.body._id);
                (atividadediariumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Atividadediaria if not signed in', function (done) {
    // Create new Atividadediarium model instance
    var atividadediariumObj = new Atividadediarium(atividadediarium);

    // Save the atividadediarium
    atividadediariumObj.save(function () {
      // Request Atividadediaria
      request(app).get('/api/atividadediaria')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Atividadediarium if not signed in', function (done) {
    // Create new Atividadediarium model instance
    var atividadediariumObj = new Atividadediarium(atividadediarium);

    // Save the Atividadediarium
    atividadediariumObj.save(function () {
      request(app).get('/api/atividadediaria/' + atividadediariumObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', atividadediarium.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Atividadediarium with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/atividadediaria/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Atividadediarium is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Atividadediarium which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Atividadediarium
    request(app).get('/api/atividadediaria/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Atividadediarium with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Atividadediarium if signed in', function (done) {
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

        // Save a new Atividadediarium
        agent.post('/api/atividadediaria')
          .send(atividadediarium)
          .expect(200)
          .end(function (atividadediariumSaveErr, atividadediariumSaveRes) {
            // Handle Atividadediarium save error
            if (atividadediariumSaveErr) {
              return done(atividadediariumSaveErr);
            }

            // Delete an existing Atividadediarium
            agent.delete('/api/atividadediaria/' + atividadediariumSaveRes.body._id)
              .send(atividadediarium)
              .expect(200)
              .end(function (atividadediariumDeleteErr, atividadediariumDeleteRes) {
                // Handle atividadediarium error error
                if (atividadediariumDeleteErr) {
                  return done(atividadediariumDeleteErr);
                }

                // Set assertions
                (atividadediariumDeleteRes.body._id).should.equal(atividadediariumSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Atividadediarium if not signed in', function (done) {
    // Set Atividadediarium user
    atividadediarium.user = user;

    // Create new Atividadediarium model instance
    var atividadediariumObj = new Atividadediarium(atividadediarium);

    // Save the Atividadediarium
    atividadediariumObj.save(function () {
      // Try deleting Atividadediarium
      request(app).delete('/api/atividadediaria/' + atividadediariumObj._id)
        .expect(403)
        .end(function (atividadediariumDeleteErr, atividadediariumDeleteRes) {
          // Set message assertion
          (atividadediariumDeleteRes.body.message).should.match('User is not authorized');

          // Handle Atividadediarium error error
          done(atividadediariumDeleteErr);
        });

    });
  });

  it('should be able to get a single Atividadediarium that has an orphaned user reference', function (done) {
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

          // Save a new Atividadediarium
          agent.post('/api/atividadediaria')
            .send(atividadediarium)
            .expect(200)
            .end(function (atividadediariumSaveErr, atividadediariumSaveRes) {
              // Handle Atividadediarium save error
              if (atividadediariumSaveErr) {
                return done(atividadediariumSaveErr);
              }

              // Set assertions on new Atividadediarium
              (atividadediariumSaveRes.body.name).should.equal(atividadediarium.name);
              should.exist(atividadediariumSaveRes.body.user);
              should.equal(atividadediariumSaveRes.body.user._id, orphanId);

              // force the Atividadediarium to have an orphaned user reference
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

                    // Get the Atividadediarium
                    agent.get('/api/atividadediaria/' + atividadediariumSaveRes.body._id)
                      .expect(200)
                      .end(function (atividadediariumInfoErr, atividadediariumInfoRes) {
                        // Handle Atividadediarium error
                        if (atividadediariumInfoErr) {
                          return done(atividadediariumInfoErr);
                        }

                        // Set assertions
                        (atividadediariumInfoRes.body._id).should.equal(atividadediariumSaveRes.body._id);
                        (atividadediariumInfoRes.body.name).should.equal(atividadediarium.name);
                        should.equal(atividadediariumInfoRes.body.user, undefined);

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
      Atividadediarium.remove().exec(done);
    });
  });
});
