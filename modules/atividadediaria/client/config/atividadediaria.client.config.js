(function () {
  'use strict';

  angular
    .module('atividadediaria')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Atividadediaria',
      state: 'atividadediaria',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'atividadediaria', {
      title: 'List Atividadediaria',
      state: 'atividadediaria.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'atividadediaria', {
      title: 'Create Atividadediarium',
      state: 'atividadediaria.create',
      roles: ['user']
    });
  }
})();
