import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class LauncherCtrl extends Controller {
  constructor() {
    super(...arguments);

    let storage = window.localStorage;
    let selectedLocation = JSON.parse(storage.getItem('location'));
    selectedLocation ? this.$rootScope.selectedLocation = selectedLocation : null;

    if(!this.$rootScope.selectedLocation){
      this.$state.go('intro');
    }else{
      this.$state.go('tab.search');
    }
  }
}

LauncherCtrl.$name = 'LauncherCtrl';
LauncherCtrl.$inject = ['$log', '$scope', '$rootScope', '$state', '$ionicSlideBoxDelegate', '$timeout'];
