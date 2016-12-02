import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileRegisterCtrl extends Controller {
  constructor() {
    super(...arguments);
  }
  register(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }
}

ProfileRegisterCtrl.$name = 'ProfileRegisterCtrl';
ProfileRegisterCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
