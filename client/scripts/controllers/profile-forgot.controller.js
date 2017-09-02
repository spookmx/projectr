import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileForgotCtrl extends Controller {
  constructor() {
    super(...arguments);


  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

  reset(){
    this.loading(true);
    Accounts.forgotPassword({email:this.email}, (error, result) => {
      if (error) return this.handleError(error);
      var alertPopup = this.$ionicPopup.alert({
        title: 'Forgot Password',
        template: 'An email with instructions to reset your password will be sent soon.'
       });
       this.email = '';
       this.loading(false);
       this.$state.go('tab.profile');
    });
  }

  handleError(error){
    var alertPopup = this.$ionicPopup.alert({
      title: 'Error',
      template: error.reason
     });
    console.error(error);
    this.loading(false)
  }

}

ProfileForgotCtrl.$name = 'ProfileForgotCtrl';
ProfileForgotCtrl.$inject = ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$log'];
