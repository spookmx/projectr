import { Controller } from 'angular-ecmascript/module-helpers';

export default class TabsCtrl extends Controller {
  constructor() {
    super(...arguments);


  }

  goTo(){
    this.$state.go('tab.requests');
  }
}

TabsCtrl.$name = 'TabsCtrl';
TabsCtrl.$inject = ['$log', '$scope', '$rootScope', '$state', '$ionicHistory'];
