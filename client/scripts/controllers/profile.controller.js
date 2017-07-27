import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileCtrl extends Controller {
  constructor() {

    super(...arguments);

    this.subscribe('users', () => []);

    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });
  }
  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }
  requestInvite(){
    //Call method to send invite
  }
  logout(){
    this.loading(true);
    Meteor.logout(this.loading(false));
  }
  login(){
    this.loading(true);
    Meteor.loginWithPassword(this.loginForm.email, this.loginForm.password, (error)=>{
      if(error){
        console.log(error);
      }
      this.loading(false)
    });
  }
  forgotPassword(){
    //ToDo
  }
}

ProfileCtrl.$name = 'ProfileCtrl';
ProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
