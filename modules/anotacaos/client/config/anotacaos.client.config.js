(function () {
  'use strict';

  angular
    .module('anotacaos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Anotacaos',
      state: 'anotacaos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'anotacaos', {
      title: 'List Anotacaos',
      state: 'anotacaos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'anotacaos', {
      title: 'Create Anotacao',
      state: 'anotacaos.create',
      roles: ['user']
    });
  }
})();
