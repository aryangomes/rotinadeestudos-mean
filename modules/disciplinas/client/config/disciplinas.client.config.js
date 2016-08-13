(function () {
  'use strict';

  angular
    .module('disciplinas')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Disciplinas',
      state: 'disciplinas',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'disciplinas', {
      title: 'List Disciplinas',
      state: 'disciplinas.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'disciplinas', {
      title: 'Create Disciplina',
      state: 'disciplinas.create',
      roles: ['user']
    });
  }
})();
