import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileRegisterCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.passwordToggleLabel = "Show";
    this.passwordToggleShow = false;
    this.helpers({
      userId() {
        return Meteor.userId();
      }
    });
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

  register(){
    this.loading(true);
    Accounts.createUser({
			email:this.email,
			password:this.password,
    }, this.updateInitialInfo());
  }

  updateInitialInfo(){
    this.$scope.$watch('profileRegister.userId', () => {
      if(this.userId){
        Meteor.users.update(this.userId, {
          $set: {
            givenName: this.givenName,
            familyName: this.familyName,
            roleAttribute: this.occupation
          }
        }, this.registerCompleted());
      }
    });
  }

  registerCompleted(){
    this.loading(false);
    this.$state.go('tab.profile');
  }

  passwordToggle(){
    if(this.passwordToggleShow){
      this.passwordToggleShow = false;
      this.passwordToggleLabel = "Show";
    } else{
      this.passwordToggleShow = true;
      this.passwordToggleLabel = "Hide";
    }
  }

}

ProfileRegisterCtrl.$name = 'ProfileRegisterCtrl';
ProfileRegisterCtrl.$inject = ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$log'];
