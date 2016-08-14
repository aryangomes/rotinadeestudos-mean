'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Anotacaos Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/anotacaos',
      permissions: '*'
    }, {
      resources: '/api/anotacaos/:anotacaoId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/anotacaos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/anotacaos/:anotacaoId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/anotacaos',
     permissions: ['get', 'post']
    }, {
      resources: '/api/anotacaos/:anotacaoId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Anotacaos Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Anotacao is being processed and the current user created it then allow any manipulation
  if (req.anotacao && req.user && req.anotacao.user && req.anotacao.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
