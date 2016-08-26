 /*(function () {
  'use strict';

  angular
    .module('notificacaoanotacaos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

 function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Notificacaoanotacaos',
      state: 'notificacaoanotacaos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'notificacaoanotacaos', {
      title: 'List Notificacaoanotacaos',
      state: 'notificacaoanotacaos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'notificacaoanotacaos', {
      title: 'Create Notificacaoanotacao',
      state: 'notificacaoanotacaos.create',
      roles: ['user']
    });
  }
})();*/
