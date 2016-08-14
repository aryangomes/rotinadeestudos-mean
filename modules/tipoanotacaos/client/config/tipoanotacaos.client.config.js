(function () {
  'use strict';

  angular
    .module('tipoanotacaos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Tipoanotacaos',
      state: 'tipoanotacaos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'tipoanotacaos', {
      title: 'List Tipoanotacaos',
      state: 'tipoanotacaos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'tipoanotacaos', {
      title: 'Create Tipoanotacao',
      state: 'tipoanotacaos.create',
      roles: ['user']
    });
  }
})();
