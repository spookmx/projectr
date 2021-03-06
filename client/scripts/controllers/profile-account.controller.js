import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileAccountCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.roles = {
      doctor: 'Doctor',
      nurse: 'Nurse',
      stock: 'Stock Manager'
    };
    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });
  }

  showProfileAccountNameModal(){
    this.ProfileAccountName.showModal();
  }

  showProfileAccountRoleModal(){
    this.ProfileAccountRole.showModal();
  }

  showProfileAccountEmailModal(){
    this.ProfileAccountEmail.showModal();
  }

  showProfileAccountPasswordModal(){
    this.ProfileAccountPassword.showModal();
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

}

ProfileAccountCtrl.$name = 'ProfileAccountCtrl';
ProfileAccountCtrl.$inject = ['ProfileAccountName', 'ProfileAccountRole', 'ProfileAccountEmail', 'ProfileAccountPassword', '$scope', '$state', '$ionicLoading', '$ionicModal', '$log'];
