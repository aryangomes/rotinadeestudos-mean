'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Disciplina = mongoose.model('Disciplina');

/**
 * Globals
 */
var user, disciplina;

/**
 * Unit tests
 */
describe('Disciplina Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() { 
      disciplina = new Disciplina({
        name: 'Disciplina Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return disciplina.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) { 
      disciplina.name = '';

      return disciplina.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Disciplina.remove().exec(function(){
      User.remove().exec(function(){
        done();  
      });
    });
  });
});
