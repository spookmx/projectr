import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileRegisterCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.passwordToggleLabel = "Show";
    this.passwordToggleShow = false;
    this.loading(true);
    Meteor.logout(()=>{
      this.loading(false);
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
    this.$scope.$watch('profileRegister.currentUserId', () => {
      if(this.currentUserId){
        Meteor.users.update(this.currentUserId, {
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
    this.callMethod('sendVerificationEmail', this.currentUserId, (err, result) => {
      if (err) return this.handleError(err);
      this.loading(false);
      var alertPopup = this.$ionicPopup.alert({
        title: 'Register',
        template: 'An email with instructions to verify your email address will be sent out shortly.'
       });
      this.$state.go('tab.profile');
    });
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
