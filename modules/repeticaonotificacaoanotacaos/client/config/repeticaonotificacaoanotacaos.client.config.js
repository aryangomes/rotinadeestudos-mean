 /*(function () {
  'use strict';

  angular
    .module('repeticaonotificacaoanotacaos')
    .run(menuConfig);

 menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Repeticaonotificacaoanotacaos',
      state: 'repeticaonotificacaoanotacaos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'repeticaonotificacaoanotacaos', {
      title: 'List Repeticaonotificacaoanotacaos',
      state: 'repeticaonotificacaoanotacaos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'repeticaonotificacaoanotacaos', {
      title: 'Create Repeticaonotificacaoanotacao',
      state: 'repeticaonotificacaoanotacaos.create',
      roles: ['user']
    });
  }
})();*/
