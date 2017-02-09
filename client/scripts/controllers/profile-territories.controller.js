import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileTerritoriesCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users', () => []);

    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });
  }

  showAddStateModal(){
    this.AddState.showModal();
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

}

ProfileTerritoriesCtrl.$name = 'ProfileTerritoriesCtrl';
ProfileTerritoriesCtrl.$inject = ['AddState', '$scope', '$state', '$ionicLoading', '$ionicModal', '$log'];
